import type { TableData } from "../types/table.types";

class TableExtractorService {

    /**
     * =====================================
     * Extract Tables
     * =====================================
     */
    extract(document: Document): TableData[] {

        const tables: TableData[] = [];

        const elements = document.querySelectorAll("table");

        elements.forEach(table => {

            if (!this.isVisible(table)) {
                return;
            }

            const tableData = this.parseTable(table);

            if (
                tableData.rows.length === 0 &&
                tableData.headers.length === 0
            ) {
                return;
            }

            tables.push(tableData);

        });

        return tables;

    }

    /**
     * =====================================
     * Parse Table
     * =====================================
     */
    private parseTable(table: HTMLTableElement): TableData {

        const headers: string[] = [];
        const rows: string[][] = [];

        /**
         * Caption
         */
        const caption =
            table.querySelector("caption")
                ?.textContent
                ?.trim() || "";

        /**
         * Extract Headers
         */
        const headerRow =
            table.querySelector("thead tr");

        if (headerRow) {

            headerRow
                .querySelectorAll("th")
                .forEach(th => {

                    headers.push(
                        th.textContent?.trim() || ""
                    );

                });

        }

        /**
         * If no THEAD exists,
         * use first row if it contains TH
         */
        if (headers.length === 0) {

            const firstRow =
                table.querySelector("tr");

            if (firstRow) {

                const ths =
                    firstRow.querySelectorAll("th");

                if (ths.length > 0) {

                    ths.forEach(th => {

                        headers.push(
                            th.textContent?.trim() || ""
                        );

                    });

                }

            }

        }

        /**
         * Extract Rows
         */
        table.querySelectorAll("tbody tr").forEach(tr => {

            const row: string[] = [];

            tr.querySelectorAll("td").forEach(td => {

                row.push(
                    td.textContent?.trim() || ""
                );

            });

            if (row.length > 0) {

                rows.push(row);

            }

        });

        /**
         * No tbody?
         */
        if (rows.length === 0) {

            const allRows =
                table.querySelectorAll("tr");

            allRows.forEach((tr, index) => {

                /**
                 * Skip header row
                 */
                if (
                    headers.length &&
                    index === 0
                ) {
                    return;
                }

                const row: string[] = [];

                tr.querySelectorAll("td").forEach(td => {

                    row.push(
                        td.textContent?.trim() || ""
                    );

                });

                if (row.length > 0) {

                    rows.push(row);

                }

            });

        }

        return {

            caption,

            headers,

            rows,

            rowCount: rows.length,

            columnCount:
                headers.length ||
                (rows[0]?.length ?? 0)

        };

    }

    /**
     * =====================================
     * Visibility Check
     * =====================================
     */
    private isVisible(element: Element): boolean {

        const html = element as HTMLElement;

        const style =
            window.getComputedStyle(html);

        return (

            style.display !== "none" &&

            style.visibility !== "hidden" &&

            html.offsetParent !== null

        );

    }

}

export default new TableExtractorService();
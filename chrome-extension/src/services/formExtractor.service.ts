import type {

    FormData,
    FormField

} from "../types/form.types";

class FormExtractorService {

    /**
     * =====================================
     * Extract Forms
     * =====================================
     */
    extract(document: Document): FormData[] {

        const forms: FormData[] = [];

        document
            .querySelectorAll("form")
            .forEach(form => {

                if (!this.isVisible(form)) {
                    return;
                }

                forms.push(
                    this.parseForm(form)
                );

            });

        return forms;

    }

    /**
     * =====================================
     * Parse Form
     * =====================================
     */
    private parseForm(

        form: HTMLFormElement

    ): FormData {

        const fields: FormField[] = [];

        const inputs = form.querySelectorAll(
            "input, textarea, select"
        );

        inputs.forEach((element) => {

            if (
                element instanceof HTMLInputElement ||
                element instanceof HTMLTextAreaElement ||
                element instanceof HTMLSelectElement
            ) {

                fields.push(
                    this.parseField(element)
                );

            }

        });

        return {

            action:

                form.action ||

                "",

            method:

                form.method ||

                "GET",

            id:

                form.id ||

                "",

            name:

                form.name ||

                "",

            fields

        };

    }

    /**
     * =====================================
     * Parse Field
     * =====================================
     */
    private parseField(

        element:

            HTMLInputElement |

            HTMLTextAreaElement |

            HTMLSelectElement

    ): FormField {

        let label = "";

        /**
         * Label using "for"
         */
        if (element.id) {

            const labelElement =

                document.querySelector(

                    `label[for="${element.id}"]`

                );

            label =

                labelElement?.textContent?.trim() ||

                "";

        }

        /**
         * Parent label
         */
        if (!label) {

            const parentLabel =

                element.closest("label");

            label =

                parentLabel?.textContent?.trim() ||

                "";

        }

        return {

            name:

                element.name ||

                "",

            type:

                element instanceof HTMLInputElement

                    ? element.type

                    : element.tagName.toLowerCase(),

            placeholder:

                element.getAttribute(

                    "placeholder"

                ) ||

                "",

            label,

            required:

                element.required,

            value:

                element.value || ""

        };

    }

    /**
     * =====================================
     * Visibility
     * =====================================
     */
    private isVisible(

        element: Element

    ): boolean {

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

export default new FormExtractorService();
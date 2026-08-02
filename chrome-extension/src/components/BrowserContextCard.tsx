import type { BrowserContext } from "../types/browser.types";

interface BrowserContextCardProps {
    context: BrowserContext | null;
}

function BrowserContextCard({

    context

}: BrowserContextCardProps) {

    if (!context) {

        return (

            <div
                style={{
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    padding: 16,
                    marginBottom: 20,
                    background: "#fafafa"
                }}
            >

                <h3>🌐 Browser Context</h3>

                <p>Collecting browser context...</p>

            </div>

        );

    }

    return (

        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 16,
                marginBottom: 20,
                background: "#fafafa"
            }}
        >

            <h3 style={{ marginTop: 0 }}>

                🌐 Browser Context

            </h3>

            <p>

                <strong>Title</strong>

                <br />

                {context.title}

            </p>

            <p>

                <strong>URL</strong>

                <br />

                <span
                    style={{
                        wordBreak: "break-word",
                        color: "#1976d2"
                    }}
                >
                    {context.url}
                </span>

            </p>

            <p>

                <strong>Hostname</strong>

                <br />

                {context.hostname}

            </p>

            <p>

                <strong>Protocol</strong>

                <br />

                {context.protocol}

            </p>

            <p>

                <strong>Language</strong>

                <br />

                {context.language}

            </p>

            <hr />

            <p
                style={{
                    color: "green",
                    fontWeight: "bold",
                    marginBottom: 0
                }}
            >

                🟢 Context Available

            </p>

        </div>

    );

}

export default BrowserContextCard;
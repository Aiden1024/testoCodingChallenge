// 2025/10/31
// Implemented by Aiden Li

export default function ImageTextSection({ blok }) {
    const { headline, text, image, reverse_layout, image_layout, button } = blok;

    const isReversed = reverse_layout || image_layout === "left";

    const rawHeadline = extractText(headline);
    const rawText = extractText(text);

    return (
        <section className=" border-t border-gray-300 py-4 h-screen flex flex-col">
            {/* Section Header */}
            <div className="pb-8">
                <h2 className=" line-clamp-2 pl-8  md:text-3xl font-bold items-start flex flex-col border-transparent border-b-2 w-full border-b-black pb-2">
                    <p className="my-4 text-4xl">2-column text section</p>
                </h2>
            </div>

            <div
                className={`p-4 flex-grow justify-center  max-w-[1920px]  mx-auto flex flex-col md:flex-row items-center gap-12 ${isReversed ? "md:flex-row-reverse" : ""
                    }`}
            >
                {/* LEFT: text */}
                <div className="flex-1 space-y-6 text-gray-700 text-start">
                    <h3 className="text-4xl font-semibold text-gray-900 whitespace-pre-line">
                        {rawHeadline}
                    </h3>

                    <p className="text-lg whitespace-pre-line ">
                        {rawText}
                    </p>

                    {button?.length > 0 && (
                        <div>
                            {button.map((b) => (
                                <a
                                    key={b._uid}
                                    href={b.link?.url || "#"}
                                    className="inline-block rounded-full mt-4 px-6 py-2 bg-orange-400 hover:bg-orange-500 text-white font-semibold shadow transition"
                                >
                                    {b.label || "Mehr erfahren"}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {/* RIGHT: image */}
                <div className="flex-1">
                    {image?.filename && (
                        <img
                            src={image.filename}
                            alt={image.alt || ""}
                            className="rounded-lg shadow-lg w-full  object-cover"
                        />
                    )}
                </div>
            </div>
        </section>
    );
}

// helper function 放在文件底部
function extractText(richText) {
    if (!richText || !richText.content) return "";
    let text = "";
    richText.content.forEach((node) => {
        if (node.type === "text") {
            text += node.text || "";
        } else if (node.content) {
            text += extractText(node);
        } else if (node.type === "hard_break") {
            text += "\n";
        }
    });
    return text;
}
export function formatDateJP(input?: string | null) {
    if (!input) return null;

    const d = new Date(input);
    if (isNaN(d.getTime())) return null;

    return d.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: '2-digit',
        day: '2-digit',
    });
}
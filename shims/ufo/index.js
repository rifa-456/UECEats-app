export function joinURL(...parts) {
    return parts.filter(Boolean).join('/').replace(/\/+/g, '/');
}
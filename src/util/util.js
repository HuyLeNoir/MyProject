export function formatDateLocal(date) {
    if (date == null) return;
    const pad = (n) => String(n).padStart(2, "0");
    return [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join("-");
}

export function getCurrentUser() {
    try {
        const userData = JSON.parse(localStorage.getItem("user")).userData;
        return userData;
    } catch (error) {
        console.log("Khong tim thay user");
    }
}
export function getToken() {
    try {
        const token = JSON.parse(localStorage.getItem("user")).token;
        return token;
    } catch (error) {
        console.log("Khong tim thay token");
    }
}
export async function apiResponse(res) {
    if (!res.ok) {
        return { success: false, message: "Request error" };
    }
    return await res.json();
}

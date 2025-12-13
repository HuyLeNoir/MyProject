export function formatDateLocal(date) {
    if (date == null) return;
    const pad = (n) => String(n).padStart(2, "0");
    return [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join("-");
}
export function formatToDisplayDate(date) {
    if (!date) return;
    const pad = (n) => String(n).padStart(2, "0");
    return [pad(date.getDate()), pad(date.getMonth() + 1), date.getFullYear()].join("/");
}
export function formatDisplayDateToSQLDate(dateString) {
    if (dateString) {
        const pad = (n) => String(n).padStart(2, "0");
        const date = dateString.split("/");
        return [pad(date[2]), pad(date[1]), pad(date[0])].join("-");
    }
    return null;
}
export function currencyStringToNunber(str) {
    if (!str) {
        return;
    }
    return Number(str.replace(/\./g, ""));
}
export function formatCurrency(value) {
    if (!value) {
        return;
    } else if (typeof value == "number") {
        return value.toLocaleString("vi-VN");
    } else {
        const temp = Number(value.replace(/\./g, ""));
        return temp.toLocaleString("vi-VN");
    }
    //value -> number
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
export function SinhVienFromUsers(dbResult) {
    return dbResult
        .filter((row) => row.ROLE === "SinhVien")
        .map((row) => ({
            USERID: row.USERID,
            HO_TEN_USER: row.HO_TEN_USER,
            MSSV: row.MSSV,
        }));
}
export function GiangVienFromUsers(dbResult) {
    return dbResult
        .filter((row) => row.ROLE === "GiangVien")
        .map((row) => ({
            USERID: row.USERID,
            HO_TEN_USER: row.HO_TEN_USER,
            MACB: row.MACB,
            HOC_VAN: row.HOC_VAN,
            EMAIL: row.EMAIL,
            SDT: row.SDT,
        }));
}
export function randInt(min, max) {
    return Math.random() * (max - min) + min;
}
export function getDataByPeriod(data, timePeriod) {
    //only works with data whcih have year as a key
    const thisYear = new Date().getFullYear();
    const filteredData = Object.entries(data).filter(
        ([key, value]) => key >= thisYear - timePeriod + 1
    );
    return Object.fromEntries(filteredData);
}

export async function getCap() {
    try {
        const res = await fetch("/api/admin/danhmuc/cap");
        const json = await res.json();
        console.log("fetching");
        return { capRes: res, DSCap: json };
    } catch (error) {
        console.log(error.message);
    }
}
export async function getUsers() {
    try {
        const res = await fetch("/api/admin/users");
        const json = await res.json();
        console.log("fetching");
        return { usersRes: res, DSUser: json };
    } catch (error) {
        console.log(error.message);
    }
}
export async function getLinhVuc() {
    try {
        const res = await fetch("/api/admin/danhmuc/linhvuc");
        const json = await res.json();
        console.log("fetching");
        return { linhVucRes: res, DSLinhVuc: json };
    } catch (error) {
        console.log(error.message);
    }
}

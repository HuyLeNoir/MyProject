import { useNavigate } from "react-router-dom";
import { getToken } from "../util/util";

export async function getCap() {
    const token = getToken();
    const res = await fetch("/api/admin/danhmuc/cap", {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
        const json = await res.json();
        console.log("fetching cap");
        return { capRes: res, DSCap: json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
export async function getUsers() {
    const token = getToken();
    const res = await fetch("/api/admin/users", {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
        const json = await res.json();
        console.log("fetching user");
        return { usersRes: res, DSUser: json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
export async function getLinhVuc() {
    const token = getToken();
    const res = await fetch("/api/admin/danhmuc/linhvuc", {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
        const json = await res.json();
        console.log("fetching linhvuc");
        return { linhVucRes: res, DSLinhVuc: json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
export async function getDeTai() {
    const token = getToken();
    const res = await fetch("/api/admin/detais", {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
        const json = await res.json();
        console.log("fetching detai");
        return { getDeTaiRes: res, DSDeTai: json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
export async function getDeTaiByID(id) {
    const token = getToken();
    const res = await fetch(`/api/admin/detais/${id}`, {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
        const json = await res.json();
        console.log("fetching detai by id");
        return { getDeTaiByIDRes: res, getDeTaiByIDJson: json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}

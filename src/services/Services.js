import { useNavigate } from "react-router-dom";
import { getToken } from "../util/util";

export async function getType() {
    const token = getToken();
    const res = await fetch("/api/admin/danhmuc/type", {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
        const json = await res.json();
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
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
export async function queryUsers(query) {
    const token = getToken();
    const { ROLE, HOC_VAN, Search } = query;
    const params = new URLSearchParams();
    if (ROLE) params.append("ROLE", ROLE);
    if (HOC_VAN) params.append("HOC_VAN", HOC_VAN);
    if (Search) params.append("Search", Search);
    const url = `/api/admin/users?${params.toString()}`;
    //cool
    const res = await fetch(url, { method: "get", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) {
        const json = await res.json();
        return { res, json };
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
    const res = await fetch("/api/admin/researchs", {
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
export async function queryResearchs(query) {
    console.log("called with q=", query);
    const token = getToken();
    const { MACB, TEN_LINH_VUC, TEN_CAP, NAM_BD, NAM_KT, Search } = query;
    const res = await fetch(
        `/api/admin/researchs/?MACB=${MACB}&TEN_LINH_VUC=${TEN_LINH_VUC}&TEN_CAP=${TEN_CAP}&NAM_BD=${NAM_BD}&NAM_KT=${NAM_KT}&Search=${Search}`,
        { method: "get", headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.ok) {
        const json = await res.json();
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
export async function getDeTaiByID(id) {
    const token = getToken();
    const res = await fetch(`/api/admin/researchs/${id}`, {
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

export async function getSeminars() {
    const token = getToken();
    const res = await fetch("/api/admin/seminars", {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
        const json = await res.json();
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
export async function getSeminarByID(id) {
    const token = getToken();
    const res = await fetch(`/api/admin/seminars/${id}`, {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
        const json = await res.json();
        console.log("fetching seminar by id");
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}

export async function getProjects() {
    const token = getToken();
    console.log("fetching projects");
    const res = await fetch("/api/admin/projects", {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
        const json = await res.json();
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
export async function getProjectByID(id) {
    const token = getToken();
    console.log("fetching project by id");
    const res = await fetch(`/api/admin/projects/${id}`, {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
        const json = await res.json();
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}

export async function getPublications() {
    const token = getToken();
    console.log("fetching projects");
    const res = await fetch("/api/admin/publications", {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
        const json = await res.json();
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
export async function queryPublications(query) {
    const token = getToken();
    console.log("called with q=", query);
    const { MACB, LOAI_BAIBAO, NAM_BD, NAM_KT, Search } = query;
    const res = await fetch(
        `/api/admin/publications/?MACB=${MACB}&LOAI_BAIBAO=${LOAI_BAIBAO}&NAM_BD=${NAM_BD}&NAM_KT=${NAM_KT}&Search=${Search}`,
        { method: "get", headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.ok) {
        const json = await res.json();
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
export async function querySeminars(query) {
    const token = getToken();
    console.log("called with q=", query);
    const { MACB, NAM_BD, NAM_KT, Search } = query;
    const res = await fetch(
        `/api/admin/seminars/?MACB=${MACB}&NAM_BD=${NAM_BD}&NAM_KT=${NAM_KT}&Search=${Search}`,
        { method: "get", headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.ok) {
        const json = await res.json();
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
export async function queryProjects(query) {
    const token = getToken();
    console.log("called with q=", query);
    const { MACB, NAM_BD, NAM_KT, CAP_PROJECT, Search } = query;
    const res = await fetch(
        `/api/admin/projects/?MACB=${MACB}&CAP_PROJECT=${CAP_PROJECT}&NAM_BD=${NAM_BD}&NAM_KT=${NAM_KT}&Search=${Search}`,
        { method: "get", headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.ok) {
        const json = await res.json();
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
export async function getPublicationByID(id) {
    const token = getToken();
    console.log("fetching project by id");
    const res = await fetch(`/api/admin/publications/${id}`, {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
        const json = await res.json();
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}

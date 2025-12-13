import { getToken } from "../util/util";

export async function getType() {
    const res = await fetch("/api/type", {
        method: "get",
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
    const res = await fetch("/api/levels", {
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
    const res = await fetch("/api/users", {
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
    const res = await fetch("/api/fields", {
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
    const res = await fetch("/api/researchs/", {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
        const json = await res.json();
        console.log("fetching detai");
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
//query is object
export async function queryResearchs(query) {
    console.log("called with q=", query);
    const { MACB, TEN_LINH_VUC, TEN_CAP, NAM_BD, NAM_KT, Search } = query;
    const res = await fetch(
        `/api/researchs/?MACB=${MACB}&TEN_LINH_VUC=${TEN_LINH_VUC}&TEN_CAP=${TEN_CAP}&NAM_BD=${NAM_BD}&NAM_KT=${NAM_KT}&Search=${Search}`,
        { method: "get" }
    );
    if (res.ok) {
        const json = await res.json();
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
export async function getSeminars() {
    const res = await fetch("/api/seminars", {
        method: "get",
    });
    if (res.ok) {
        const json = await res.json();
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
export async function querySeminars(query) {
    console.log("called with q=", query);
    const { MACB, NAM_BD, NAM_KT, Search } = query;
    const res = await fetch(
        `/api/seminars/?MACB=${MACB}&NAM_BD=${NAM_BD}&NAM_KT=${NAM_KT}&Search=${Search}`,
        { method: "get" }
    );
    if (res.ok) {
        const json = await res.json();
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}

export async function getProjects() {
    console.log("fetching projects");
    const res = await fetch("/api/projects", {
        method: "get",
    });
    if (res.ok) {
        const json = await res.json();
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
export async function queryProjects(query) {
    console.log("called with q=", query);
    const { MACB, NAM_BD, NAM_KT, CAP_PROJECT, Search } = query;
    const res = await fetch(
        `/api/projects/?MACB=${MACB}&CAP_PROJECT=${CAP_PROJECT}&NAM_BD=${NAM_BD}&NAM_KT=${NAM_KT}&Search=${Search}`,
        { method: "get" }
    );
    if (res.ok) {
        const json = await res.json();
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
export async function getPublications() {
    const token = getToken();
    console.log("fetching publications");
    const res = await fetch("/api/publications", {
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
    console.log("called with q=", query);
    const { MACB, LOAI_BAIBAO, NAM_BD, NAM_KT, Search } = query;
    const res = await fetch(
        `/api/publications/?MACB=${MACB}&LOAI_BAIBAO=${LOAI_BAIBAO}&NAM_BD=${NAM_BD}&NAM_KT=${NAM_KT}&Search=${Search}`,
        { method: "get" }
    );
    if (res.ok) {
        const json = await res.json();
        return { res, json };
    } else {
        throw new Error(`Fetch failed with status: ${res.status}`);
    }
}
export async function getTeacherInformationByID(MACB) {
    console.log("fetching teacher information...");
    try {
        const res = await fetch(`/api/teachers/${MACB}`);
        if (res.ok) {
            const json = await res.json();
            return { res, json };
        }
    } catch (error) {
        console.log(error);
    }
}
export async function getStatisticTeachers() {
    try {
        const res = await fetch("/api/statistic/teachers", { method: "get" });
        const json = await res.json();
        return { res, json };
    } catch (error) {
        console.log(error);
    }
}
export async function getStatisticTotal() {
    try {
        const res = await fetch("/api/statistic/total", { method: "get" });
        const json = await res.json();
        return { res, json };
    } catch (error) {
        console.log(error);
    }
}

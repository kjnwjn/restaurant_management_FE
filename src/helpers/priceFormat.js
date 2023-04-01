export default function (value) {
    if (value && value >= 1000000) {
        let v1 = Math.floor(value / 1000000);
        let v2 = Math.floor((value % 1000000) / 1000);
        let v3 = Math.floor((value % 1000000) % 1000);
        v2 = v2 < 100 ? (v2 < 10 ? `00${v2}` : `0${v2}`) : v2;
        v3 = v3 < 100 ? (v3 < 10 ? `00${v3}` : `0${v3}`) : v3;
        return `${v1},${v2},${v3} vnđ`;
    } else if (value && value < 1000000) {
        let v1 = Math.floor(value / 1000);
        let v2 = Math.floor(value) % 1000;
        v2 = v2 < 100 ? (v2 < 10 ? `00${v2}` : `0${v2}`) : v2;
        return `${v1},${v2} vnđ`;
    } else {
        return "0 vnđ";
    }
}

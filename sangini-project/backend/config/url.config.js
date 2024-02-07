module.exports = {
    users: {
        base: "/users",
        register: "/register",
        login: "/login",
        profile: "/profile",
    },
    bioinfo: {
        base: "http://127.0.0.1:5000",
        bioinfo: "/bioinfo",
        nussinov: "/nussinov",
        zuker: "/zuker",
    },
    dashboard: {
        bioinfo:"/dashboard/bioinfo",
        nussinov: "/dashboard/nussinov",
        zuker: "/dashboard/zuker",
        saveBioInfoData : "/dashboard/saveBioInfoData",        
        getRNASequences : "/dashboard/getRNASequences"        
    }
}
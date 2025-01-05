// if you choose operator o and you have a random number n and a goal g, then
// the opposite will use g o.oppo n for every case.

// G is goal
// N is random num
// X is num to find
// S is smaller random num

let ops = {
    "+" : {
        use : "N+X",
        getX : "G-N",
        priority: 2
    },
    "-" : {
        use : "X-N",
        getX : "G+N",
        priority: 2
    },
    "*" : {
        use : "N*X",
        getX : "G/N",
        priority: 1
    },
    "/" : {
        use : "N/X",
        getX : "N/G",
        priority: 1
    },
    "%" : {
        use : "X%(G*N)",
        getX : "(G*N)+G",
        priority: 1
    },
    "^|" : {
        use : "N^|round(X)",
        getX : "round(G)^|N",
        priority: 2    
    },
    "~" : {
        use : "~round(X*N)",
        getX : "~round(G)/N",
        priority: 0
    },
    "<<" : {
        use : "round(X*N)<<S",
        getX : "(round(G)>>S)/N",
        priority: 3
    },
    ">>" : {
        use : "round(X*N)>>S",
        getX : "(round(G)<<S)/N",
        priority: 3
    },
    "?:" : {
        use : "S<N?X:N",
        getX : "G",
        priority: 10
    },
    "sqrt" : {
        use : "sqrt(X)",
        getX : "G^2",
        priority: 0
    },
    "cbrt" : {
        use: "cbrt(X)",
        getX : "G^3",
        priority: 0
    },
    "log" : {
        use: "log(X,S)",
        getX: "S^G",
        priority: 0
    },
    "^" : {
        use: "X^S",
        getX: "log(G,S)",
        priority: -1
    },
    "trig" : {
        use: "sin(N)^2+cos(N)^2-1+N+X",
        getX: "G-N",
        priority: 2
    },
    "sec" : {
        use: "sec(N)^2-tan(N)^2-1+N+X",
        getX: "G-N",
        priority: 2
    },
    "sine law" : {
        use: "sin(2*N)-(2*sin(N)*cos(N))+N+X",
        getX: "G-N",
        priority: 1
    }
};


const dennis = {
    name: "Dennis",
    age: 16,
};

let x = array.from(dennis.name);
console.log(x);

for (let i = 0; i < dennis.name.length; i++) {
    console.log(dennis.name[i]);
}

let i = 0;
while (i < dennis.name.length) {
    console.log(dennis.name[i]);
    i++;
}

// console.log(12 + "13");
// console.log(dennis.name);
export {foo};

function foo() { console.log("hello!") }

(() => console.log("test")).call();

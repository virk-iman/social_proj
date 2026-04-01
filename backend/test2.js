(async () => {
    try {
        const resReg = await fetch('http://localhost:5001/api/auth/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fullName: "Test Bot " + Math.random(),
                username: "testbotx" + Math.random(),
                email: "testbotx" + Math.random() + "@bot.com",
                password: "pass"
            })
        });
        const regData = await resReg.json();
        if (!resReg.ok) throw new Error(JSON.stringify(regData));

        const token = regData.token;
        console.log("Registered. Token:", token.slice(0, 10));

        const resPost = await fetch('http://localhost:5001/api/posts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ content: "Hello", image: "" })
        });

        const postData = await resPost.json();
        if (!resPost.ok) throw new Error(JSON.stringify(postData));

        console.log("Post success!", postData);
    } catch (err) {
        console.error("Test failed:", err.message);
    }
})();

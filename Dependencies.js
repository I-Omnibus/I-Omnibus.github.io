class Dependencies {
  static async resolve(scripts, bypassCache = false) {
    const asyncScriptLoader = [];

    scripts.forEach((name) => {
      const scriptUrl = `${name}.js${Dependencies.cache(bypassCache)}`;
      asyncScriptLoader.push(Dependencies.scriptLoadPromise(scriptUrl));
    });

    await Promise.all(asyncScriptLoader).catch((scriptUrl) => {
      console.error(`Script load failure: ${scriptUrl}`);
    });

    return;
  }

  static scriptLoadPromise(scriptUrl) {
    return new Promise((resolve, reject) => {
      Dependencies.load(scriptUrl, resolve, reject);
    });
  }

  static load(scriptUrl, resolve, reject) {
    const tag = document.createElement("script");
    //tag.type = "module";
    tag.onload = () => resolve(scriptUrl);
    tag.onerror = (error) => reject(error.target.src);

    document.head.appendChild(tag);
    tag.src = scriptUrl;
  }

  static cache(enabled = true) {
    return enabled ? "?" + (Math.floor(Math.random() * 9000) + 1000) : "";
  }
}

export {Dependencies};

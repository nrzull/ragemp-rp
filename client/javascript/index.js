mp.events.add("JS_ACCOUNT_SEND_CREDENTIALS", () => {
  if (!mp.storage) return;

  const browser = mp.browsers.at(0);
  if (!browser) return;

  const payload = JSON.stringify(mp.storage.data.credentials);

  browser.execute(`bus.emit("UI_LOGIN_CREDENTIALS_GET", ${payload})`);
});

mp.events.add("JS_ACCOUNT_STORE_CREDENTIALS", payload => {
  if (!payload && !mp.storage) return;

  mp.storage.data.credentials = {
    username: payload.Username,
    password: payload.Password
  };

  mp.storage.flush();
});

mp.events.add("JS_ACCOUNT_REMOVE_CREDENTIALS", () => {
  if (!mp.storage) return;

  delete mp.storage.data.credentials;
  mp.storage.flush();
});

mp.events.add();

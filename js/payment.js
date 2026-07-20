/**
 * M-Pesa STK Push payment (Marvel Network gateway)
 */
window.AuroraTravels = window.AuroraTravels || {};

window.AuroraTravels.payment = (() => {
  const CONFIG = Object.freeze({
    API_BASE_URL: "https://marvel-network-3e75.onrender.com",
    POLL_INTERVAL_MS: 5000,
    POLL_MAX_ATTEMPTS: 12,
    TOAST_DURATION_MS: 5000,
  });

  const API = (() => {
    const BASE = CONFIG.API_BASE_URL;
    const request = async (url, options = {}) => {
      try {
        const response = await fetch(url, options);
        const data = await response.json().catch(() => ({}));
        return { ok: response.ok, status: response.status, data };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    };
    return {
      stkPush: (phone, amount) =>
        request(`${BASE}/api/stk-push`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone,
            amount: Math.floor(amount),
            hours: 1,
          }),
        }),
      queryPayment: (id) =>
        request(`${BASE}/api/query-payment?id=${encodeURIComponent(id)}`),
    };
  })();

  const PHONE = {
    isValid: (raw) => /^(07|01|254|\+254)\d{8}$/.test(String(raw).trim()),
    normalise: (raw) => {
      let p = String(raw).trim();
      if (p.startsWith("+")) p = p.slice(1);
      if (p.startsWith("0")) p = `254${p.slice(1)}`;
      return p;
    },
  };

  function ensureToastHost() {
    let host = document.getElementById("toast-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "toast-host";
      host.className = "toast-host";
      document.body.appendChild(host);
    }
    return host;
  }

  function toast(title, message, type) {
    const host = ensureToastHost();
    const el = document.createElement("div");
    el.className = `toast toast--${type}`;
    el.innerHTML = `<div class="toast-title">${title}</div><div class="toast-msg">${message}</div>`;
    host.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    window.setTimeout(() => {
      el.classList.remove("show");
      window.setTimeout(() => el.remove(), 400);
    }, CONFIG.TOAST_DURATION_MS);
  }

  const TOAST = {
    success: (t, m) => toast(t, m, "success"),
    error: (t, m) => toast(t, m, "error"),
  };

  let activePoll = null;

  function clearPoll() {
    if (activePoll) {
      clearInterval(activePoll);
      activePoll = null;
    }
  }

  async function startStkPush({ phone, amount, onStatus, onSuccess, onError }) {
    if (!PHONE.isValid(phone)) {
      TOAST.error("VALIDATION_ERROR", "Invalid M-Pesa format. Use 07… or 254…");
      onError?.("invalid_phone");
      return;
    }

    const normalised = PHONE.normalise(phone);
    const kes = Math.floor(Number(amount));
    if (!kes || kes < 1) {
      TOAST.error("VALIDATION_ERROR", "Invalid amount.");
      onError?.("invalid_amount");
      return;
    }

    onStatus?.("authorizing");
    const { ok, data } = await API.stkPush(normalised, kes);

    if (ok && data.CheckoutRequestID) {
      TOAST.success("STK SENT", "Enter your M-Pesa PIN on your phone.");
      pollPayment(data.CheckoutRequestID, { onStatus, onSuccess, onError });
    } else {
      TOAST.error("GATEWAY_REJECTION", data?.message || "Check connection.");
      onError?.(data?.message || "gateway");
    }
  }

  function pollPayment(checkoutID, { onStatus, onSuccess, onError }) {
    clearPoll();
    let attempts = 0;

    activePoll = setInterval(async () => {
      attempts += 1;
      onStatus?.("polling", attempts);

      const { ok, data } = await API.queryPayment(checkoutID);

      if (ok && data.status === "paid") {
        clearPoll();
        TOAST.success("PAYMENT_VERIFIED", "M-Pesa payment confirmed.");
        onSuccess?.(data);
      } else if (ok && (data.status === "failed" || data.status === "cancelled")) {
        clearPoll();
        TOAST.error("TRANSACTION_FAILED", "Cancelled or failed on device.");
        onError?.(data.status);
      } else if (attempts >= CONFIG.POLL_MAX_ATTEMPTS) {
        clearPoll();
        TOAST.error("POLL_TIMEOUT", "No response from gateway.");
        onError?.("timeout");
      }
    }, CONFIG.POLL_INTERVAL_MS);
  }

  return {
    CONFIG,
    PHONE,
    TOAST,
    startStkPush,
    clearPoll,
  };
})();

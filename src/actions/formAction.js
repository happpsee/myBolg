import {form} from "@/modules/login/login.js";

import { emitter } from "@/utils/eventEmitter.js";

export const FormActions = () => {
  if (!$(".header-list--log-reg-btn")[0]) {
    return false;
  }

  $(".header-list--log-reg-btn").on("click", (e) => { 
    const type = e.target.dataset?.type?.trim();
    form.switchStatus(type);
  });
  emitter.listener("loginSuccss", () => {
    $(".header-list--log-reg-btn").off().remove();
  });
};
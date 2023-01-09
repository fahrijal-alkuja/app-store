import { defineStore } from "pinia";
export const useProfile = defineStore("profile-store", {
  state: () => ({
    items: [] as any,
  }),
  actions: {
    async newProfile(profile: any) {
      const response = await fetch(
        `${useRuntimeConfig().public.baseUrl}profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        }
      );
      const data = await response.json();
      this.items.push(data);
    },
    async updateProfile(profile: any) {
      const response = await fetch(
        `${useRuntimeConfig().public.baseUrl}profile/${profile.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        }
      );
      const data = await response.json();
      this.items.push(data);
    },
  },
});

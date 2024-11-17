export const state = {
  permission: null,
};

export const mutations = {
  SET_PERMISSION(state, permission) {
    state.permission = permission;
  },
};

export const actions = {
  setPermission({ commit }, permission) {
    commit('SET_PERMISSION', permission);
  },
};

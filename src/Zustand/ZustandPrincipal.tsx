import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const ZustandPrincipal = create(
  persist(
    (set) => ({
      user: {},
      setUser: (userData) => set({ user: userData }),

      token: "",
      setToken: (tokenTemp) => set({ token: tokenTemp }),

      tramite: "",
      setTramite: (tramiteTemp) => set({ tramite: tramiteTemp }),
    }),


    {
      name: 'zustand-storage',
      
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        tramite: state.tramite
      }),
    }
  )
);

export default ZustandPrincipal;

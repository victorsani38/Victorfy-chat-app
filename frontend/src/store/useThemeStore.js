import {create} from "zustand"

export const useThemeStore = create((set) => ({
    theme:localStorage.getItem("victorfy-theme")||"coffee",
    setTheme: (theme) => {
        localStorage.setItem("victorfy-theme", theme)
        set({theme})
    }
}))
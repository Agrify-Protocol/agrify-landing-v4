import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "../fonts/inter_display/InterDisplay-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/inter_display/InterDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/inter_display/InterDisplay-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/inter_display/InterDisplay-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/inter_display/InterDisplay-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/inter_display/InterDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/inter_display/InterDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/inter_display/InterDisplay-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/inter_display/InterDisplay-Thin.otf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-inter", // Add CSS variable
});

export const pangaia = localFont({
  src: [
    {
      path: "../fonts/pp_pangaia/otf/PPPangaia-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/pp_pangaia/otf/PPPangaia-Ultralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/pp_pangaia/otf/PPPangaia-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-pangaia", // Add CSS variable
});

export const suisse = localFont({
  src: [
    {
      path: "../fonts/suisse_int_l/SuisseIntl-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/suisse_int_l/SuisseIntl-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/suisse_int_l/SuisseIntl-Book.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/suisse_int_l/SuisseIntl-Ultralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/suisse_int_l/SuisseIntl-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/suisse_int_l/SuisseIntl-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/suisse_int_l/SuisseIntl-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/suisse_int_l/SuisseIntl-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/suisse_int_l/SuisseIntl-Thin.otf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-suisse", // Add CSS variable
});
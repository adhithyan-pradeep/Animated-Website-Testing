Here is a complete, professional `README.md` template tailored to your matcha scrollytelling project. You can copy and paste this directly into your GitHub repository.

````markdown
# Artisan Iced Matcha Latte – Scrollytelling Experience 🍵

A premium, Awwwards-style scrollytelling landing page built to showcase the dynamic deconstruction of an artisan iced matcha latte. As the user scrolls, a high-resolution 120-frame image sequence animates seamlessly, paired with beautifully choreographed typography.

## ✨ Features

* **Scroll-Linked Canvas Animation:** Frame-by-frame image sequence playback tied directly to scroll progress.
* **Buttery Smooth Interpolation:** Uses Framer Motion's `useSpring` to eliminate jitter and ensure a 60fps experience.
* **Dynamic Typography:** Text overlays that fade and translate perfectly in sync with the visual beats of the animation.
* **Optimized Loading:** Preloads all sequence assets with an elegant loading state and progress bar before revealing the experience.
* **Fully Responsive:** Canvas utilizes `contain` fit logic to look stunning on both mobile and desktop displays.
* **Invisible Edges:** Flawless blending with a pure `#000000` void background for a luxury aesthetic.

## 🧰 Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animation:** [Framer Motion](https://www.framer.com/motion/)
* **Rendering:** HTML5 Canvas

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed.

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/adhithyan-pradeep/Animated-Website-Testing.git](https://github.com/adhithyan-pradeep/Animated-Website-Testing.git)
   cd Animated-Website-Testing
````

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  Add your image sequence:

      * Export your 120-frame animation as `.webp` files.
      * Name them strictly as `frame_0.webp` through `frame_119.webp`.
      * Place them in the `public/sequence/` directory.

4.  Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

5.  Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

  * `app/page.tsx`: The main landing page orchestrating the scrollytelling beats.
  * `components/MatchaAnimation.tsx`: The core component handling the sticky canvas, image preloading, and scroll-linked drawing logic.
  * `app/globals.css`: Tailwind base styles and custom minimal dark scrollbars.

## 🧠 Design Philosophy

Inspired by high-end product pages (like Apple and luxury automotive brands), this project relies on huge typography, generous whitespace, and subtle animations to convey a professional, confident, and premium feel.

-----

*Designed & Developed by Adhithyan Pradeep*

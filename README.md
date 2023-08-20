# WebGL Final Project 👩🏼‍💻🪄

## Project Overview 💻

This project aims to create a website that showcases a collection of creative design models in five distinct sections. The website will serve as a portfolio or gallery where you I display your creative work and ideas.

### 1. Introduction Scene

In the "Introduction Scene," I've crafted a visually captivating experience using a combination of 3D design elements and custom shaders. The focal point of this scene is a box geometry that serves as a canvas for creativity. The magic happens with a custom shader as the material, which seamlessly blends vibrant shades of orange and deep purple.

#### Key Features:

- Box Geometry: The core of this scene is a sculpted box geometry, providing a dynamic canvas to display my creative ideas.

- Custom Shader: To achieve a color transition effect, I've implemented a custom shader as the material for the box. This shader smoothly blends the contrasting hues of orange and purple.

### 2. Statue 3D Model Scene

In the "Statue 3D Model Scene," I bring the magic of 3D Model art to life. This section is dedicated to showcasing stunning 3D models of various statues textures.

#### Key Features:
- GLB Model Loading: I've integrated GLB model loading into this scene.

- Texture Loader: Each statue features a one-of-a-kind texture, carefully crafted to enhance its unique character. I've used the TextureLoader to apply these distinct textures, adding to their individuality and artistic charm..

- DRACOLoader: Behind the scenes, I've harnessed the power of DRACOLoader to efficiently decompress 3D models, ensuring swift loading times and a smooth user experience.

- Interactive Scrolling: To add a touch of interactivity, I've incorporated a scrolling mechanism that allows users to control the rotation of each 3D model by scrolling up or down.

### 3. Bedroom Model Scene

In the "Bedroom Model Scene," I present a lifelike 3D model of a cozy bedroom, focusing on enhancing realism and ambiance.

#### Key Features:

- GLB Model Loading: I've integrated GLB model loading into this scene.

- Environment Map: To heighten the sense of realism, I've incorporated an environment map. This map mirrors the surroundings outside the room, creating a convincing illusion of the external environment seen through the windows.

- Point Lights: Lamps in the room are equipped with point lights. These lights not only illuminate the room but also add warmth and coziness, enhancing the overall ambiance.

- Duvet Texture: Utilizing TextureLoader, I've introduced the ability to alter the duvet's texture. This feature ensures that the room remains fresh and captivating, preventing any sense of monotony.

### 4. Interactive Model Scene

The "Interactive Model Scene" injects an element of joy and fun into the website by featuring the iconic dancing Shrek model.

#### Key Features:

- Shrek Dancing Model: The centerpiece of this scene is Shrek, dancing to the rhythm and spreading joy to users. To make this happen, I use a GLB loader to effortlessly bring the Shrek model into the scene. The AnimationMixer plays a central role, directing the dance animation, infusing life into Shrek's every step and movement.

- Directional Light and Shadow: To create a realistic ambiance, I've employed a directional light source that specifies the lighting direction. This light source casts shadows, enhancing the immersion. Additionally, a plane geometry serves as a surface to receive and display these shadows, adding depth and realism to the scene.

- Raycaster Interaction: For an interactive twist, I've integrated a Raycaster feature. When users hover their cursor over Shrek, the scene dynamically changes colors, adding an engaging element to the experience.

- Custom Shader Snowflake Effect: Behind Shrek, a custom shader generates a mesmerizing snowflake effect. This effect adds an enchanting ambiance, making the scene even more captivating.

### 5. Thank You Scene

In the "Thank You Scene," I express gratitude by repurposing the custom shader initially featured in the Introduction Scene. However, this time, I replace the geometry with a Sphere, creating a fresh and distinctive visual experience.

#### Key Features:

- Custom Shader Revisited: I revisit the custom shader that seamlessly blended colors in the Introduction Scene.

- Sphere Geometry: As a unique twist, I replace the original Box Geometry with a Sphere Geometry. This change in geometry adds a new dimension to the visual presentation, providing a fresh perspective.

## Challenging 💥

Integrating ReactJS with Three.js can be challenging due to the abundance of resources geared towards React with libraries like R3F. Furthermore, I'm encountering difficulties with OrbitControl, as it isn't functioning as expected within my project.

## Installation 🛠
To set up and run a creative design portfolio website project, you'll need to follow these installation steps:

1. Clone the Repository

```git clone https://github.com/Supatsara-Rodratsa/webgl-final-project```

2. Install Dependencies

```npm install```

3. Run the Development Server

```npm run dev```
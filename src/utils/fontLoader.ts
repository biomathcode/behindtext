import FontFaceObserver from 'fontfaceobserver';

export const GOOGLE_FONTS = [
  'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald', 'Raleway', 'Poppins', 'Merriweather', 'Noto Sans',
  'PT Sans', 'Rubik', 'Work Sans', 'Nunito', 'Fira Sans', 'Titillium Web', 'Cabin', 'Quicksand', 'Barlow',
  'Source Sans Pro', 'Ubuntu', 'Josefin Sans', 'DM Sans', 'Playfair Display', 'Arimo', 'Hind', 'Karla',
  'Mukta', 'Tajawal', 'Inter', 'Manrope', 'Dancing Script', 'Pacifico', 'Lobster', 'Righteous', 'Bebas Neue',
  'Anton', 'Fredoka One', 'Comfortaa', 'Abril Fatface', 'Bangers', 'Creepster', 'Orbitron', 'Russo One',
  'Permanent Marker', 'Shadows Into Light', 'Amatic SC', 'Indie Flower', 'Kaushan Script', 'Great Vibes'
];

export const SYSTEM_FONTS = [
  'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 'Comic Sans MS', 'Impact', 'Trebuchet MS',
  'Courier New', 'Lucida Console', 'Tahoma', 'Palatino', 'Garamond', 'Bookman', 'Avant Garde'
];

export const loadFont = async (font: string): Promise<void> => {
  // Skip loading for system fonts
  if (SYSTEM_FONTS.includes(font)) {
    return Promise.resolve();
  }

  const linkId = `google-font-${font.replace(/\s+/g, '-')}`;

  // Check if font link already exists
  if (!document.getElementById(linkId)) {
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g, '+')}:wght@100;200;300;400;500;600;700;800;900&display=swap`;
    document.head.appendChild(link);
  }

  // Use FontFaceObserver to ensure font is loaded
  const observer = new FontFaceObserver(font);
  try {
    await observer.load(null, 10000); // 10 second timeout
  } catch (error) {
    console.warn(`Failed to load font: ${font}`, error);
    // Don't throw error, just continue with fallback
  }
};

export const getFontOptions = () => {
  const systemFontOptions = SYSTEM_FONTS.map(font => ({
    value: font,
    label: font,
    category: 'System Fonts'
  }));

  const googleFontOptions = GOOGLE_FONTS.map(font => ({
    value: font,
    label: font,
    category: 'Google Fonts'
  }));

  return [
    {
      label: 'System Fonts',
      options: systemFontOptions
    },
    {
      label: 'Google Fonts',
      options: googleFontOptions
    }
  ];
};
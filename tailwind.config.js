module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins'],
        Inter: ['Inter'],
      },
      boxShadow: {
        '3xl-personalized': '0px 0px 24px rgba(0, 0, 0, 0.16)',
        inputShadow: '0px 0px 4px rgba(13, 16, 35, 0.32)',
      },
      colors: {
        
        primary:'#00c2cb',
        secundary:'#1fcab3',
        secundaryOpacity:'rgba(31, 202, 179, .4)',
        blue400: '#8DADDE',
        blue1000: '#446BE6',
        textBlue400: '#687E9D',
        white10: '#FDFDFD',
        white50: '#F1F1F1',
        blue700: '#304056',
        blue900: '#14213F',
        button: {
          1: '#D47B18',
        },
        blue: {
          3: '#8DADDE',
          4: '#446BE5',
        },
        // Status
        red800: '#CC5656',
        notSent: '#E36565',
        concluded: '#62BD87',
        pending: '#E3B459',
        upload: '#53A5D1',
        // Logo-Colors
        yellow1: '#F9B233',
        orange1: '#EB5D22',
        purple1: '#6C0C42',
        purple2: '#AE196E',
        // General-colors
        buttonWhite: '#F1F1F1',
        darkPink: '#982165',
        btnCancel: '#9C9C9C',
        black1: '#434343',
        black900: '#D9DBDF',
        gray900: '#424557',
        backgroundBox: '#F3F3F3',
        // Input
        background: '#F9F9F9',
        textIcon: '#8A8A8A',
        sidebarColor: '#313031',
        table: { 1: '#E4E7EB', 2: '#F8F8F8', 3: '#E6E6E6', 4: '#DEDEDE' },
      },
    },
  },
  daisyui: {
    themes: [
      'emerald'
    ],
  },
  plugins: [require("daisyui")],
};

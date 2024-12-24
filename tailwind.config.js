/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
              white1 : '#ffffff',
              white2 : '#f0f0f0',
              blue1 :'#471AAA',
              blue2 : '#6c48bb'
            },

            fontFamily:{
                lalezar : ['Lalezar','serif']
            },

            borderColor:{
                blue2 : '#6c48bb'
            },

            flex: {
                '4': '4 4 0%'
              },

              padding:{
                280 : '280px'
              },

              borderRadius:{
                '50%' : '50%'
              },

              boxShadow:{
                'shadow1' : '0 8px 24px 10px rgba(149, 157, 165, 0.5)',
              },
              zIndex:{
                '2' : '2'
              },
              flex :{
                4: '4',
                5:'5',
               6 :'6',
                7:'7'
              }

        },
    },
    plugins: [

    ],
}

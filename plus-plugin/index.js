({
  preInit({ themes }) {
    const families = {};
    const weights = {Normal:400, Medium:500, Semibold:600, Bold:700, ExtraBold:800};
    for (const family of ['ggsans', 'NotoSans']) {
      for (const [style, weight] of Object.entries(weights)) {
        families[`${family}-${style}`] = [
          {path:'assets/fonts/Plus.ttf', weight, italic:false},
          {path:'assets/fonts/Plus.ttf', weight, italic:true}
        ];
      }
    }
    themes.registerGroup('plus-local', {name:'Plus Font'});
    themes.registerFontPack('plus-local', 'plus', {
      name:'Plus — Local',
      description:'Local static TrueType font. All sans-serif weights use the same file.',
      families
    });
  }
})

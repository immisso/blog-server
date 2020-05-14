'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('articles', [
      {
        title: '道德经',
        uid: 2,
        cover: 'https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200514/rc-upload-1589409506474-11.jpeg',
        content_mark: `道可道，非常道，名可名，非常名，无名天地之始，有名万物之母，故常无欲，以观其妙，常有欲，以观其徼，此两者同出而异名，同谓之玄，玄之又玄，众妙之门。

        世人皆知美之为美，斯恶已，皆知善之为善，斯不善已，故有无相生，难易相成，长短相较，高下相倾，音声相和，前后相随，是以圣人处无为之事，行不言之交，万物作焉而不辞，生而不有，为而不恃，功成而弗居，夫唯弗居，是以不去。
        
        ![](https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200514/rc-upload-1589409506474-2.jpeg)
        
        不尚贤，使民不争；不贵难得之货，使民不为盗；不见（xiàn）可欲，使民心不乱。是以圣人之治，虚其心，实其腹；弱其志，强其骨。常使民无知无欲，使夫（fú）智者不敢为也。为无为，则无不治。
        
        道冲而用之或不盈，渊兮似万物之宗。挫其锐，解其纷，和其光，同其尘。湛兮似或存，吾不知谁之子，象帝之先。
        
        ![](https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200514/rc-upload-1589409506474-9.jpeg)
        
        天地不仁，以万物为刍（chú）狗；圣人不仁，以百姓为刍狗。天地之间，其犹橐龠（tuó yuè）乎？虚而不屈，动而愈出。多言数（shuò）穷，不如守中。
        
        谷神不死，是谓玄牝（pìn），玄牝之门，是谓天地根。绵绵若存，用之不勤。
        
        天长地久。天地所以能长且久者，以其不自生，故能长生。是以圣人后其身而身先，外其身而身存。非以其无私邪（yé）？故能成其私。
        
        上善若水。水善利万物而不争，处众人之所恶（wù），故几（jī）于道。居善地，心善渊，与善仁，言善信，正善治，事善能，动善时。夫唯不争，故无尤。
        
        持而盈之，不如其已。揣(chuǎi)而锐之，不可长保。金玉满堂，莫之能守。富贵而骄，自遗（yí）其咎。功成身退，天之道。

        载（zài）营魄抱一，能无离乎？专气致柔，能婴儿乎？涤除玄览，能无疵乎？爱民治国，能无知（zhì）乎？天门开阖（hé），能无雌乎？明白四达，能无为乎？生之、畜（xù）之，生而不有，为而不恃，长（zhǎng）而不宰，是谓玄德。`,
        like: 100,
        view: 122,
        comment: 0,
        category_id: 1,
        tag_id: 1,
      },
      {
        title: '插画欣赏',
        uid: 1,
        cover: 'https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200515/rc-upload-1589493244054-22.jpeg',
        content_mark: `插画在中国被人们俗称为插图。今天通行于国外市场的商业插画包括出版物配图、卡通吉祥物、影视海报、游戏人物设定及游戏内置的美术场景设计、广告、漫画、绘本、贺卡、挂历、装饰画、包装等多种形式。延伸到现在的网络及手机平台上的虚拟物品及相关视觉应用等。
        
        为了凑够几篇测试文章，只有放图了。哈哈哈！
        
        ![](https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200515/rc-upload-1589493244054-2.jpeg)
        
        ![](https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200515/rc-upload-1589493244054-4.jpeg)
        
        ![](https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200515/rc-upload-1589493244054-6.jpeg)
        
        ![](https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200515/rc-upload-1589493244054-8.jpeg)
        
        ![](https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200515/rc-upload-1589493244054-11.jpeg)
        
        ![](https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200515/rc-upload-1589493244054-13.jpeg)
        
        ![](https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200515/rc-upload-1589493244054-15.jpeg)
        
        ![](https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200515/rc-upload-1589493244054-17.jpeg)
        
        ![](https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200515/rc-upload-1589493244054-19.jpeg)
        
        放图完毕!
        > 图片均来源于网络`,
        like: 100,
        view: 122,
        comment: 0,
        category_id: 2,
        tag_id: 3,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('articles', null, {});
  },
};

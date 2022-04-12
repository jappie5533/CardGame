
$(function () {
    var Role = [{ roname: 'SSR 日向 翔陽', rosrc: '/image/日向.jpg' }, { roname: 'SSR 影山 飛雄', rosrc: '/image/影山.jpg' }, { roname: 'SR 澤村 大地', rosrc: '/image/大地.jpg' }, { roname: 'SR 菅原 孝支', rosrc: '/image/管員.jpg' }, { roname: 'SR田中 龍之介', rosrc: '/image/田中龍.jpg' }, { roname: 'R 東峰 旭', rosrc: '/image/旭.jpg' }, { roname: 'R 西谷 夕', rosrc: '/image/西谷.jpg' }, { roname: 'R 月島 蛍', rosrc: '/image/月島.jpg' }, { roname: 'R 山口 忠', rosrc: '/image/山口.jpg' }, { roname: 'N 吉祥物', rosrc: '/image/吉祥物.gif' }]

    $('.maincontent').hide();  //先把內容隱藏起來 
    var total = [];  //存取抽卡機率 基數是100個 SSR代表1 SR代表2 S代表3 N代表 放幾個進去就代表幾%
    
    for (let i = 0; i < 5; i++) {
        total += 1;
    }
    for (let i = 0; i < 20; i++) {
        total += 2;
    }
    for (let i = 0; i < 25; i++) {
        total += 3;
    }
    for (let i = 0; i < 50; i++) {
        total += 4;
    }
    var ttcount=0
    var btncount = 1;
    var ranimg = [];
    var ssrcount=0;
    var srcount=0;
    var rcount=0;
    var ncount=0;
    var totalcount=0;
    
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };  // 亂數函式:在兩個參數之間取亂數
  
      function playAudio(s) {//用來撥放音效
        const audio = document.createElement("audio");
        audio.src = s;
        audio.volume=0.3;
        audio.play();
        
      }
    $('#start').on('click', function () {

        if (btncount % 2 == 1) {  //如果按這倫第一次按鈕
            $('.ssrimg').remove();
            $('.allcontent .picture').off('click');//
            playAudio("/music/抽卡.mp3");
            ranimg = [];  //儲存抽10次的結果
            ttcount++;
            totalcount=ttcount*10;  //計算目前抽卡總數
            for (let index = 0; index < 10; index++) {
                var num = Math.floor(Math.random() * 100);
                if (total[num] == 1) {
                    var num2 = getRandom(0, 1);
                    ranimg += num2;
                    ssrcount++;
                }
                if (total[num] == 2) {
                    var num2 = getRandom(2, 4);
                    ranimg += num2;
                    srcount++;
                }
                if (total[num] == 3) {
                    var num2 = getRandom(5, 8);
                    ranimg += num2;
                    rcount++;
                }
                if (total[num] == 4) {
                    var num2 =9;
                    ranimg += num2;
                    ncount++;
                }

            }
            $('.maincontent p').each(function(ind,ele) {
                 $(this).text(`${Role[ranimg[ind]].roname}`);
                }  
            )  //設定卡片的名子
            $('.maincontent p').hide();  //先把卡片名子隱藏避免第二輪的時候還沒抽卡就顯示名稱
            $('.allcontent div' ).each(function() {
                $(this).css('border-color','black');
                
            })
            $('.picture').prop('src', './image/卡背.jpg');  //設定卡背
            $('.maincontent .picture').each(function (ind, ele) {
                $('.maincontent').slideDown();  //卡片出現效果
                $(this).prop('class', 'picture');  //重製卡片類別
                $(this).on('click', function () {
                    playAudio("/music/翻卡.mp3");
                    $(this).siblings().show();
                    $(this).prop('src', Role[ranimg[ind]].rosrc);  //設定抽到的卡圖案
                    $(this).prop('class', 'picture turn ');  //增加反面效果
                    //下面把抽到的卡片邊框變色
                    if (ranimg[ind] == 1 || ranimg[ind] == 0) {
                        $(this).before('<img class="ssrimg" src="/image/sparkles.gif" alt="">');
                        $(this).parent().css('border-color', 'gold')
                        playAudio("/music/SSR.mp3")
                    }
                    if (ranimg[ind] == 2 || ranimg[ind] == 3 || ranimg[ind] == 4) {
                        $(this).parent().css('border-color', 'red')
                    }
                    if (ranimg[ind] == 5 || ranimg[ind] == 6 || ranimg[ind] == 7 || ranimg[ind] == 8) {
                        $(this).parent().css('border-color', 'gray')
                    }
                    if (ranimg[ind] == 9) {
                        $(this).parent().css('border-color', 'black')
                    }
                })
            })
        }
 
        if (btncount % 2 == 0) {  //如果按這倫第一次按鈕
            playAudio("/music/翻卡.mp3");
            
            $('.maincontent .picture').each(function (ind, ele) {
                $(this).siblings().show();  //把卡片名子顯示出來
                if (ranimg[ind] == 1 || ranimg[ind] == 0) {
                   
                    $(this).siblings().hide();//如果抽到的是SSR先不要顯示名子
                    $(this).on('click', function () {
                        playAudio("/music/SSR.mp3");
                        $(this).siblings().show();//按下的時候顯示名子
                        $(this).prop('src', Role[ranimg[ind]].rosrc);
                        $(this).prop('class', 'picture turn ');
                        $(this).parent().css('border-color', 'gold');
                       
                    })
                }
                if (ranimg[ind] == 2 || ranimg[ind] == 3 || ranimg[ind] == 4) {
                    
                    $(this).prop('src', Role[ranimg[ind]].rosrc); 
                    $(this).prop('class', 'picture turn ');
                    $(this).parent().css('border-color', 'red');

                }
                if (ranimg[ind] == 5 || ranimg[ind] == 6 || ranimg[ind] == 7 || ranimg[ind] == 8 || ranimg[ind] == 9) {
                    
                    $(this).prop('src', Role[ranimg[ind]].rosrc);
                    $(this).prop('class', 'picture turn ');
                    $(this).parent().css('border-color', 'gray');
                }
                if (ranimg[ind] == 9) {
                   
                    $(this).prop('src', Role[ranimg[ind]].rosrc);
                    $(this).prop('class', 'picture turn ');
                    $(this).parent().css('border-color', 'black');
                }
            })
            
            var rateSSR=(ssrcount/totalcount)*100
            var rounded = Math.round((rateSSR + Number.EPSILON) * 100) / 100;
            rateSSR=rounded;
            var rateSR=(srcount/totalcount)*100
            var rounded = Math.round((rateSR + Number.EPSILON) * 100) / 100;
            rateSR=rounded;
            var rateR=(rcount/totalcount)*100
            var rounded = Math.round((rateR + Number.EPSILON) * 100) / 100;
            rateR=rounded;
            var rateN=(ncount/totalcount)*100
            var rounded = Math.round((rateR + Number.EPSILON) * 100) / 100;
            rateN=rounded;

            $('.totalcount').text(`已抽次數 :${totalcount}  `);
            $('.ssr').text(`SSR:${ssrcount}次   `);
            $('.sr').text(`SR:${srcount}次   `);
            $('.r').text(`R:${rcount}次   `);
            $('.n').text(`N:${ncount}次   `);
            $('.ratessr').text(`SSR:${rateSSR}%   `);
            $('.ratesr').text(`SR:${rateSR}%   `);
            $('.rater').text(`R:${rateR}%   `);
            $('.raten').text(`N:${rateN}%   `);
            
        }
        btncount++;
    })
});

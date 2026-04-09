import React, { useState, useEffect, useCallback, useMemo } from "react";

// ============================================================================
// VOCAB DATA — 718 JLPT N5 words with Polish translations
// ============================================================================
const VOCAB_DATA = [
  { expression: "ああ", reading: "ああ", meaning: "Ah!, Oh!", pl: "Ach!, Oh!" },
  { expression: "会う", reading: "あう", meaning: "to meet, to see", pl: "spotkać, zobaczyć się" },
  { expression: "青", reading: "あお", meaning: "blue", pl: "niebieski (rzecz.)" },
  { expression: "青い", reading: "あおい", meaning: "blue", pl: "niebieski" },
  { expression: "赤", reading: "あか", meaning: "red", pl: "czerwony (rzecz.)" },
  { expression: "赤い", reading: "あかい", meaning: "red", pl: "czerwony" },
  { expression: "明るい", reading: "あかるい", meaning: "bright; cheerful", pl: "jasny; wesoły" },
  { expression: "秋", reading: "あき", meaning: "fall (season)", pl: "jesień" },
  { expression: "開く", reading: "あく", meaning: "to open, to become open", pl: "otwierać się" },
  { expression: "開ける", reading: "あける", meaning: "to open (v.t.)", pl: "otwierać (coś)" },
  { expression: "上げる", reading: "あげる", meaning: "to raise, to lift", pl: "podnosić" },
  { expression: "朝", reading: "あさ", meaning: "morning", pl: "rano" },
  { expression: "朝御飯", reading: "あさごはん", meaning: "breakfast", pl: "śniadanie" },
  { expression: "明後日", reading: "あさって", meaning: "day after tomorrow", pl: "pojutrze" },
  { expression: "足; 脚", reading: "あし", meaning: "foot; leg", pl: "stopa; noga" },
  { expression: "明日", reading: "あした", meaning: "tomorrow", pl: "jutro" },
  { expression: "あそこ", reading: "あそこ", meaning: "there, over there", pl: "tam, tamto miejsce" },
  { expression: "遊ぶ", reading: "あそぶ", meaning: "to play; to hang out", pl: "bawić się; spędzać czas" },
  { expression: "暖かい", reading: "あたたかい", meaning: "warm", pl: "ciepły" },
  { expression: "頭", reading: "あたま", meaning: "head", pl: "głowa" },
  { expression: "新しい", reading: "あたらしい", meaning: "new", pl: "nowy" },
  { expression: "あちら", reading: "あちら", meaning: "this way (polite)", pl: "tamta strona (grzeczn.)" },
  { expression: "暑い", reading: "あつい", meaning: "hot (weather)", pl: "gorący (pogoda)" },
  { expression: "熱い", reading: "あつい", meaning: "hot (objects)", pl: "gorący (przedmioty)" },
  { expression: "厚い", reading: "あつい", meaning: "thick, deep", pl: "gruby, głęboki" },
  { expression: "あっち", reading: "あっち", meaning: "over there", pl: "tam" },
  { expression: "後", reading: "あと", meaning: "afterwards; the rest", pl: "potem; reszta" },
  { expression: "あなた", reading: "あなた", meaning: "you", pl: "ty" },
  { expression: "兄", reading: "あに", meaning: "(my) older brother", pl: "(mój) starszy brat" },
  { expression: "姉", reading: "あね", meaning: "(my) older sister", pl: "(moja) starsza siostra" },
  { expression: "アパート", reading: "アパート", meaning: "apartment", pl: "mieszkanie" },
  { expression: "あの", reading: "あの", meaning: "that over there; um...", pl: "tamten; eee..." },
  { expression: "浴びる", reading: "あびる", meaning: "to bathe, to shower", pl: "brać prysznic, kąpać się" },
  { expression: "危ない", reading: "あぶない", meaning: "dangerous", pl: "niebezpieczny" },
  { expression: "甘い", reading: "あまい", meaning: "sweet", pl: "słodki" },
  { expression: "余り", reading: "あまり", meaning: "not very; surplus", pl: "niezbyt; nadmiar" },
  { expression: "雨", reading: "あめ", meaning: "rain", pl: "deszcz" },
  { expression: "飴", reading: "あめ", meaning: "(hard) candy", pl: "cukierek" },
  { expression: "洗う", reading: "あらう", meaning: "to wash", pl: "myć, prać" },
  { expression: "在る", reading: "ある", meaning: "to be, to have", pl: "być, mieć (rzeczy)" },
  { expression: "有る", reading: "ある", meaning: "to be, to have", pl: "istnieć, posiadać" },
  { expression: "歩く", reading: "あるく", meaning: "to walk", pl: "chodzić, spacerować" },
  { expression: "あれ", reading: "あれ", meaning: "that one (over there)", pl: "tamto" },
  { expression: "いい; よい", reading: "いい; よい", meaning: "good", pl: "dobry" },
  { expression: "いいえ", reading: "いいえ", meaning: "no, not at all", pl: "nie, wcale nie" },
  { expression: "言う", reading: "いう", meaning: "to say", pl: "mówić, powiedzieć" },
  { expression: "家", reading: "いえ", meaning: "house, home", pl: "dom" },
  { expression: "いかが", reading: "いかが", meaning: "how, in what way", pl: "jak (grzeczn.)" },
  { expression: "行く", reading: "いく; ゆく", meaning: "to go", pl: "iść, jechać" },
  { expression: "いくつ", reading: "いくつ", meaning: "how many, how old", pl: "ile, ile lat" },
  { expression: "いくら", reading: "いくら", meaning: "how much", pl: "ile (kosztuje)" },
  { expression: "池", reading: "いけ", meaning: "pond", pl: "staw" },
  { expression: "医者", reading: "いしゃ", meaning: "doctor", pl: "lekarz" },
  { expression: "椅子", reading: "いす", meaning: "chair", pl: "krzesło" },
  { expression: "忙しい", reading: "いそがしい", meaning: "busy", pl: "zajęty" },
  { expression: "痛い", reading: "いたい", meaning: "painful, hurt", pl: "bolesny, boli" },
  { expression: "一", reading: "いち", meaning: "one", pl: "jeden" },
  { expression: "一日", reading: "いちにち", meaning: "one day (duration)", pl: "jeden dzień" },
  { expression: "一番", reading: "いちばん", meaning: "best, first, number one", pl: "najlepszy, pierwszy, numer jeden" },
  { expression: "いつ", reading: "いつ", meaning: "when", pl: "kiedy" },
  { expression: "五日", reading: "いつか", meaning: "five days; fifth day", pl: "pięć dni; piąty dzień" },
  { expression: "一緒", reading: "いっしょ", meaning: "together", pl: "razem" },
  { expression: "五つ", reading: "いつつ", meaning: "five things", pl: "pięć (rzeczy)" },
  { expression: "いつも", reading: "いつも", meaning: "always, usually", pl: "zawsze, zwykle" },
  { expression: "犬", reading: "いぬ", meaning: "dog", pl: "pies" },
  { expression: "今", reading: "いま", meaning: "now", pl: "teraz" },
  { expression: "意味", reading: "いみ", meaning: "meaning", pl: "znaczenie" },
  { expression: "妹", reading: "いもうと", meaning: "younger sister", pl: "(moja) młodsza siostra" },
  { expression: "嫌", reading: "いや", meaning: "disagreeable, unpleasant", pl: "nieprzyjemny, niemiły" },
  { expression: "入口", reading: "いりぐち", meaning: "entrance", pl: "wejście" },
  { expression: "居る", reading: "いる", meaning: "to be (animate)", pl: "być (istoty żywe)" },
  { expression: "要る", reading: "いる", meaning: "to need", pl: "potrzebować" },
  { expression: "入れる", reading: "いれる", meaning: "to put in", pl: "wkładać" },
  { expression: "色", reading: "いろ", meaning: "color", pl: "kolor" },
  { expression: "色々", reading: "いろいろ", meaning: "various", pl: "różny, rozmaity" },
  { expression: "上", reading: "うえ", meaning: "above, on top of", pl: "nad, na górze" },
  { expression: "後ろ", reading: "うしろ", meaning: "back, behind", pl: "tył, za" },
  { expression: "薄い", reading: "うすい", meaning: "thin, weak", pl: "cienki, słaby" },
  { expression: "歌", reading: "うた", meaning: "a song", pl: "piosenka" },
  { expression: "歌う", reading: "うたう", meaning: "to sing", pl: "śpiewać" },
  { expression: "うち", reading: "うち", meaning: "home; my place", pl: "dom; moje miejsce" },
  { expression: "生まれる", reading: "うまれる", meaning: "to be born", pl: "urodzić się" },
  { expression: "海", reading: "うみ", meaning: "sea, beach", pl: "morze, plaża" },
  { expression: "売る", reading: "うる", meaning: "to sell", pl: "sprzedawać" },
  { expression: "うるさい", reading: "うるさい", meaning: "noisy; annoying", pl: "głośny; irytujący" },
  { expression: "上着", reading: "うわぎ", meaning: "coat, jacket", pl: "kurtka, marynarka" },
  { expression: "絵", reading: "え", meaning: "a painting; a picture", pl: "obraz; rysunek" },
  { expression: "映画", reading: "えいが", meaning: "movie, film", pl: "film" },
  { expression: "映画館", reading: "えいがかん", meaning: "movie theater", pl: "kino" },
  { expression: "英語", reading: "えいご", meaning: "English (language)", pl: "angielski (język)" },
  { expression: "ええ", reading: "ええ", meaning: "yes", pl: "tak" },
  { expression: "駅", reading: "えき", meaning: "station", pl: "stacja" },
  { expression: "エレベーター", reading: "エレベーター", meaning: "elevator", pl: "winda" },
  { expression: "～円", reading: "～えん", meaning: "Yen", pl: "jen (waluta)" },
  { expression: "鉛筆", reading: "えんぴつ", meaning: "pencil", pl: "ołówek" },
  { expression: "お～", reading: "お～", meaning: "honorable ~", pl: "szanowny ~ (prefiks)" },
  { expression: "美味しい", reading: "おいしい", meaning: "delicious, tasty", pl: "pyszny, smaczny" },
  { expression: "多い", reading: "おおい", meaning: "many, a lot", pl: "liczny, dużo" },
  { expression: "大きい", reading: "おおきい", meaning: "big, large", pl: "duży, wielki" },
  { expression: "大きな", reading: "おおきな", meaning: "big", pl: "duży" },
  { expression: "大勢", reading: "おおぜい", meaning: "great number of people", pl: "wielu ludzi" },
  { expression: "お母さん", reading: "おかあさん", meaning: "mother (formal)", pl: "mama (grzeczn.)" },
  { expression: "お菓子", reading: "おかし", meaning: "sweets, snack", pl: "słodycze, przekąska" },
  { expression: "お金", reading: "おかね", meaning: "money", pl: "pieniądze" },
  { expression: "起きる", reading: "おきる", meaning: "to get up; to happen", pl: "wstawać; zdarzyć się" },
  { expression: "置く", reading: "おく", meaning: "to put, to place", pl: "kłaść, stawiać" },
  { expression: "奥さん", reading: "おくさん", meaning: "(someone's) wife", pl: "(czyjaś) żona" },
  { expression: "お酒", reading: "おさけ", meaning: "sake; alcohol", pl: "sake; alkohol" },
  { expression: "お皿", reading: "おさら", meaning: "plate, dish", pl: "talerz" },
  { expression: "伯父; 叔父さん", reading: "おじさん", meaning: "uncle, middle-aged man", pl: "wujek, pan w średnim wieku" },
  { expression: "おじいさん", reading: "おじいさん", meaning: "grandfather", pl: "dziadek" },
  { expression: "教える", reading: "おしえる", meaning: "to teach, to inform", pl: "uczyć, informować" },
  { expression: "押す", reading: "おす", meaning: "to push, to press", pl: "pchać, naciskać" },
  { expression: "遅い", reading: "おそい", meaning: "slow; late", pl: "wolny; spóźniony" },
  { expression: "お茶", reading: "おちゃ", meaning: "(green) tea", pl: "herbata (zielona)" },
  { expression: "お手洗い", reading: "おてあらい", meaning: "toilet, restroom", pl: "toaleta, łazienka" },
  { expression: "お父さん", reading: "おとうさん", meaning: "father (formal)", pl: "tata (grzeczn.)" },
  { expression: "弟", reading: "おとうと", meaning: "younger brother", pl: "młodszy brat" },
  { expression: "男", reading: "おとこ", meaning: "man, male", pl: "mężczyzna" },
  { expression: "男の子", reading: "おとこのこ", meaning: "boy", pl: "chłopiec" },
  { expression: "一昨日", reading: "おととい", meaning: "the day before yesterday", pl: "przedwczoraj" },
  { expression: "おととし", reading: "おととし", meaning: "year before last", pl: "dwa lata temu" },
  { expression: "大人", reading: "おとな", meaning: "adult", pl: "dorosły" },
  { expression: "お腹", reading: "おなか", meaning: "stomach", pl: "brzuch" },
  { expression: "同じ", reading: "おなじ", meaning: "same, identical", pl: "taki sam, identyczny" },
  { expression: "お兄さん", reading: "おにいさん", meaning: "older brother (formal)", pl: "starszy brat (grzeczn.)" },
  { expression: "お姉さん", reading: "おねえさん", meaning: "older sister (formal)", pl: "starsza siostra (grzeczn.)" },
  { expression: "伯母さん; 叔母さん", reading: "おばさん", meaning: "aunt", pl: "ciocia" },
  { expression: "おばあさん", reading: "おばあさん", meaning: "grandmother", pl: "babcia" },
  { expression: "お風呂", reading: "おふろ", meaning: "a bath", pl: "kąpiel, wanna" },
  { expression: "お弁当", reading: "おべんとう", meaning: "a boxed lunch", pl: "pudełko z lunchem (bento)" },
  { expression: "覚える", reading: "おぼえる", meaning: "to memorize, to remember", pl: "zapamiętać, uczyć się na pamięć" },
  { expression: "おまわりさん", reading: "おまわりさん", meaning: "policeman (friendly)", pl: "policjant (potocz.)" },
  { expression: "重い", reading: "おもい", meaning: "heavy; serious", pl: "ciężki; poważny" },
  { expression: "面白い", reading: "おもしろい", meaning: "interesting, amusing", pl: "ciekawy, zabawny" },
  { expression: "泳ぐ", reading: "およぐ", meaning: "to swim", pl: "pływać" },
  { expression: "降りる", reading: "おりる", meaning: "to get off", pl: "wysiadać" },
  { expression: "終る", reading: "おわる", meaning: "to finish", pl: "kończyć się" },
  { expression: "音楽", reading: "おんがく", meaning: "music", pl: "muzyka" },
  { expression: "女", reading: "おんな", meaning: "woman, female", pl: "kobieta" },
  { expression: "女の子", reading: "おんなのこ", meaning: "girl", pl: "dziewczynka" },
  { expression: "～回", reading: "～かい", meaning: "counter for occurrences", pl: "licznik razy (~razy)" },
  { expression: "～階", reading: "～かい", meaning: "counter for floors", pl: "licznik pięter" },
  { expression: "外国", reading: "がいこく", meaning: "foreign country", pl: "zagranica" },
  { expression: "外国人", reading: "がいこくじん", meaning: "foreigner", pl: "obcokrajowiec" },
  { expression: "会社", reading: "かいしゃ", meaning: "company, corporation", pl: "firma, spółka" },
  { expression: "階段", reading: "かいだん", meaning: "stairs", pl: "schody" },
  { expression: "買い物", reading: "かいもの", meaning: "shopping", pl: "zakupy" },
  { expression: "買う", reading: "かう", meaning: "to buy", pl: "kupować" },
  { expression: "返す", reading: "かえす", meaning: "to return something", pl: "zwracać (coś)" },
  { expression: "帰る", reading: "かえる", meaning: "to go home, to return", pl: "wracać do domu" },
  { expression: "顔", reading: "かお", meaning: "face", pl: "twarz" },
  { expression: "かかる", reading: "かかる", meaning: "it takes (time, money)", pl: "zabierać (czas, pieniądze)" },
  { expression: "鍵", reading: "かぎ", meaning: "a lock; a key", pl: "zamek; klucz" },
  { expression: "書く", reading: "かく", meaning: "to write", pl: "pisać" },
  { expression: "学生", reading: "がくせい", meaning: "student", pl: "student" },
  { expression: "～か月", reading: "～かげつ", meaning: "(number of) months", pl: "~ miesięcy" },
  { expression: "掛ける", reading: "かける", meaning: "to put on; to hang", pl: "zakładać (okulary); wieszać" },
  { expression: "かける", reading: "かける", meaning: "to call (phone); to sit", pl: "dzwonić; siadać" },
  { expression: "傘", reading: "かさ", meaning: "umbrella", pl: "parasol" },
  { expression: "貸す", reading: "かす", meaning: "to lend", pl: "pożyczać (komuś)" },
  { expression: "風", reading: "かぜ", meaning: "wind, breeze", pl: "wiatr" },
  { expression: "風邪", reading: "かぜ", meaning: "cold, flu", pl: "przeziębienie, grypa" },
  { expression: "方", reading: "かた", meaning: "person (hon.); way of doing", pl: "osoba (grzeczn.); sposób" },
  { expression: "家族", reading: "かぞく", meaning: "family", pl: "rodzina" },
  { expression: "片仮名", reading: "かたかな", meaning: "katakana", pl: "katakana" },
  { expression: "～月", reading: "～がつ", meaning: "month of year", pl: "~ miesiąc roku" },
  { expression: "学校", reading: "がっこう", meaning: "a school", pl: "szkoła" },
  { expression: "カップ", reading: "カップ", meaning: "cup", pl: "filiżanka" },
  { expression: "家庭", reading: "かてい", meaning: "home; family", pl: "dom rodzinny; rodzina" },
  { expression: "角", reading: "かど", meaning: "corner", pl: "róg, narożnik" },
  { expression: "かばん", reading: "かばん", meaning: "bag", pl: "torba" },
  { expression: "花瓶", reading: "かびん", meaning: "(flower) vase", pl: "wazon" },
  { expression: "かぶる", reading: "かぶる", meaning: "to wear (on head)", pl: "nakładać (na głowę)" },
  { expression: "紙", reading: "かみ", meaning: "paper", pl: "papier" },
  { expression: "カメラ", reading: "カメラ", meaning: "camera", pl: "aparat" },
  { expression: "火曜日", reading: "かようび", meaning: "Tuesday", pl: "wtorek" },
  { expression: "辛い", reading: "からい", meaning: "spicy; salty", pl: "ostry; słony" },
  { expression: "体", reading: "からだ", meaning: "body; health", pl: "ciało; zdrowie" },
  { expression: "借りる", reading: "かりる", meaning: "to borrow", pl: "pożyczać (od kogoś)" },
  { expression: "～がる", reading: "～がる", meaning: "feel", pl: "odczuwać (przyrostek)" },
  { expression: "軽い", reading: "かるい", meaning: "light, minor", pl: "lekki" },
  { expression: "カレー", reading: "カレー", meaning: "curry", pl: "curry" },
  { expression: "カレンダー", reading: "カレンダー", meaning: "calendar", pl: "kalendarz" },
  { expression: "川; 河", reading: "かわ", meaning: "river", pl: "rzeka" },
  { expression: "～側", reading: "～がわ", meaning: "~ side", pl: "~ strona" },
  { expression: "可愛い", reading: "かわいい", meaning: "cute, adorable", pl: "uroczy, słodki" },
  { expression: "漢字", reading: "かんじ", meaning: "kanji", pl: "kanji (znaki chińskie)" },
  { expression: "木", reading: "き", meaning: "tree, wood", pl: "drzewo, drewno" },
  { expression: "黄色", reading: "きいろ", meaning: "yellow", pl: "żółty (rzecz.)" },
  { expression: "黄色い", reading: "きいろい", meaning: "yellow", pl: "żółty" },
  { expression: "消える", reading: "きえる", meaning: "to vanish, to disappear", pl: "znikać" },
  { expression: "聞く", reading: "きく", meaning: "to hear, to listen, to ask", pl: "słuchać, pytać" },
  { expression: "北", reading: "きた", meaning: "north", pl: "północ" },
  { expression: "ギター", reading: "ギター", meaning: "guitar", pl: "gitara" },
  { expression: "汚い", reading: "きたない", meaning: "dirty, filthy", pl: "brudny" },
  { expression: "喫茶店", reading: "きっさてん", meaning: "café", pl: "kawiarnia" },
  { expression: "切手", reading: "きって", meaning: "postage stamps", pl: "znaczki pocztowe" },
  { expression: "切符", reading: "きっぷ", meaning: "a ticket", pl: "bilet" },
  { expression: "昨日", reading: "きのう", meaning: "yesterday", pl: "wczoraj" },
  { expression: "九", reading: "きゅう", meaning: "nine", pl: "dziewięć" },
  { expression: "牛肉", reading: "ぎゅうにく", meaning: "beef", pl: "wołowina" },
  { expression: "牛乳", reading: "ぎゅうにゅう", meaning: "milk", pl: "mleko" },
  { expression: "今日", reading: "きょう", meaning: "today", pl: "dzisiaj" },
  { expression: "教室", reading: "きょうしつ", meaning: "classroom", pl: "klasa, sala lekcyjna" },
  { expression: "兄弟", reading: "きょうだい", meaning: "siblings", pl: "rodzeństwo" },
  { expression: "去年", reading: "きょねん", meaning: "last year", pl: "zeszły rok" },
  { expression: "嫌い", reading: "きらい", meaning: "dislike", pl: "nie lubić, niechęć" },
  { expression: "切る", reading: "きる", meaning: "to cut; to hang up (phone)", pl: "ciąć; rozłączać się" },
  { expression: "着る", reading: "きる", meaning: "to wear (above waist)", pl: "ubierać (górna część ciała)" },
  { expression: "綺麗", reading: "きれい", meaning: "pretty, clean", pl: "ładny, czysty" },
  { expression: "キロ; キログラム", reading: "キロ; キログラム", meaning: "kilogram", pl: "kilogram" },
  { expression: "キロ; キロメートル", reading: "キロ; キロメートル", meaning: "kilometer", pl: "kilometr" },
  { expression: "銀行", reading: "ぎんこう", meaning: "bank", pl: "bank" },
  { expression: "金曜日", reading: "きんようび", meaning: "Friday", pl: "piątek" },
  { expression: "九", reading: "く", meaning: "nine", pl: "dziewięć" },
  { expression: "薬", reading: "くすり", meaning: "medicine", pl: "lekarstwo" },
  { expression: "下さい", reading: "ください", meaning: "please do for me", pl: "proszę (zrób dla mnie)" },
  { expression: "果物", reading: "くだもの", meaning: "fruit", pl: "owoc" },
  { expression: "口", reading: "くち", meaning: "mouth", pl: "usta" },
  { expression: "靴", reading: "くつ", meaning: "shoes", pl: "buty" },
  { expression: "靴下", reading: "くつした", meaning: "socks", pl: "skarpetki" },
  { expression: "国", reading: "くに", meaning: "country", pl: "kraj" },
  { expression: "曇り", reading: "くもり", meaning: "cloudy weather", pl: "zachmurzenie" },
  { expression: "曇る", reading: "くもる", meaning: "to become cloudy", pl: "zachmurzać się" },
  { expression: "暗い", reading: "くらい", meaning: "dark, gloomy", pl: "ciemny, mroczny" },
  { expression: "～くらい; ぐらい", reading: "～くらい; ぐらい", meaning: "approximate quantity", pl: "około, mniej więcej" },
  { expression: "クラス", reading: "クラス", meaning: "a class", pl: "klasa" },
  { expression: "グラム", reading: "グラム", meaning: "gram", pl: "gram" },
  { expression: "来る", reading: "くる", meaning: "to come", pl: "przychodzić" },
  { expression: "車", reading: "くるま", meaning: "car, vehicle", pl: "samochód" },
  { expression: "黒", reading: "くろ", meaning: "black", pl: "czarny (rzecz.)" },
  { expression: "黒い", reading: "くろい", meaning: "black; dark", pl: "czarny" },
  { expression: "警官", reading: "けいかん", meaning: "police officer", pl: "policjant" },
  { expression: "今朝", reading: "けさ", meaning: "this morning", pl: "dziś rano" },
  { expression: "消す", reading: "けす", meaning: "to erase, to turn off", pl: "kasować, wyłączać" },
  { expression: "結構", reading: "けっこう", meaning: "splendid; enough", pl: "wspaniały; wystarczający" },
  { expression: "結婚", reading: "けっこん (する)", meaning: "marriage", pl: "małżeństwo (ożenić się)" },
  { expression: "月曜日", reading: "げつようび", meaning: "Monday", pl: "poniedziałek" },
  { expression: "玄関", reading: "げんかん", meaning: "entrance (house)", pl: "wejście (do domu)" },
  { expression: "元気", reading: "げんき", meaning: "healthy, energetic", pl: "zdrowy, energiczny" },
  { expression: "～個", reading: "～こ", meaning: "counter for small items", pl: "licznik małych rzeczy" },
  { expression: "五", reading: "ご", meaning: "five", pl: "pięć" },
  { expression: "～語", reading: "～ご", meaning: "word, language", pl: "~ język" },
  { expression: "公園", reading: "こうえん", meaning: "a park", pl: "park" },
  { expression: "交差点", reading: "こうさてん", meaning: "intersection", pl: "skrzyżowanie" },
  { expression: "紅茶", reading: "こうちゃ", meaning: "black tea", pl: "herbata czarna" },
  { expression: "交番", reading: "こうばん", meaning: "police box", pl: "posterunek policji" },
  { expression: "声", reading: "こえ", meaning: "voice", pl: "głos" },
  { expression: "コート", reading: "コート", meaning: "coat; court", pl: "płaszcz; kort" },
  { expression: "コーヒー", reading: "コーヒー", meaning: "coffee", pl: "kawa" },
  { expression: "ここ", reading: "ここ", meaning: "here, this place", pl: "tutaj, to miejsce" },
  { expression: "午後", reading: "ごご", meaning: "afternoon, P.M.", pl: "popołudnie" },
  { expression: "九日", reading: "ここのか", meaning: "nine days; ninth day", pl: "dziewięć dni; dziewiąty" },
  { expression: "九つ", reading: "ここのつ", meaning: "nine things", pl: "dziewięć (rzeczy)" },
  { expression: "午前", reading: "ごぜん", meaning: "morning, A.M.", pl: "przedpołudnie" },
  { expression: "答える", reading: "こたえる", meaning: "to answer, to reply", pl: "odpowiadać" },
  { expression: "こちら", reading: "こちら", meaning: "this way (polite)", pl: "ta strona (grzeczn.)" },
  { expression: "こっち", reading: "こっち", meaning: "this direction", pl: "ta strona, tutaj" },
  { expression: "コップ", reading: "コップ", meaning: "a glass, a tumbler", pl: "szklanka" },
  { expression: "今年", reading: "ことし", meaning: "this year", pl: "ten rok" },
  { expression: "言葉", reading: "ことば", meaning: "language; word(s)", pl: "słowa; język" },
  { expression: "子供", reading: "こども", meaning: "child(ren)", pl: "dziecko (dzieci)" },
  { expression: "この", reading: "この", meaning: "this", pl: "ten, ta, to" },
  { expression: "御飯", reading: "ごはん", meaning: "rice (cooked); meal", pl: "ryż (gotowany); posiłek" },
  { expression: "コピーする", reading: "コピーする", meaning: "to copy", pl: "kopiować" },
  { expression: "困る", reading: "こまる", meaning: "to have difficulty", pl: "mieć kłopot" },
  { expression: "これ", reading: "これ", meaning: "this one", pl: "to (tutaj)" },
  { expression: "～ころ; ～ごろ", reading: "～ころ; ～ごろ", meaning: "about (time)", pl: "około (czas)" },
  { expression: "今月", reading: "こんげつ", meaning: "this month", pl: "ten miesiąc" },
  { expression: "今週", reading: "こんしゅう", meaning: "this week", pl: "ten tydzień" },
  { expression: "こんな", reading: "こんな", meaning: "such, like this", pl: "taki jak ten" },
  { expression: "今晩", reading: "こんばん", meaning: "tonight", pl: "dziś wieczorem" },
  { expression: "さあ", reading: "さあ", meaning: "come now, well", pl: "no dalej, cóż" },
  { expression: "～歳", reading: "～さい", meaning: "~ years old", pl: "~ lat" },
  { expression: "財布", reading: "さいふ", meaning: "wallet", pl: "portfel" },
  { expression: "魚", reading: "さかな", meaning: "fish", pl: "ryba" },
  { expression: "先", reading: "さき", meaning: "future; previous", pl: "przyszłość; wcześniej" },
  { expression: "咲く", reading: "さく", meaning: "to bloom", pl: "kwitnąć" },
  { expression: "作文", reading: "さくぶん", meaning: "essay; composition", pl: "wypracowanie" },
  { expression: "差す", reading: "さす", meaning: "to raise (umbrella)", pl: "rozkładać (parasol)" },
  { expression: "～冊", reading: "～さつ", meaning: "counter for books", pl: "licznik książek" },
  { expression: "雑誌", reading: "ざっし", meaning: "magazine", pl: "czasopismo" },
  { expression: "砂糖", reading: "さとう", meaning: "sugar", pl: "cukier" },
  { expression: "寒い", reading: "さむい", meaning: "cold (weather)", pl: "zimny (pogoda)" },
  { expression: "さ来年", reading: "さらいねん", meaning: "year after next", pl: "za dwa lata" },
  { expression: "～さん", reading: "～さん", meaning: "Mr. ~, Ms. ~", pl: "pan/pani ~" },
  { expression: "三", reading: "さん", meaning: "three", pl: "trzy" },
  { expression: "散歩", reading: "さんぽ (する)", meaning: "walk, stroll", pl: "spacer" },
  { expression: "四", reading: "し", meaning: "four", pl: "cztery" },
  { expression: "～時", reading: "～じ", meaning: "~ o'clock", pl: "godzina ~" },
  { expression: "塩", reading: "しお", meaning: "salt", pl: "sól" },
  { expression: "しかし", reading: "しかし", meaning: "however; but", pl: "jednak; ale" },
  { expression: "時間", reading: "じかん", meaning: "time", pl: "czas" },
  { expression: "～時間", reading: "～じかん", meaning: "~ hours", pl: "~ godzin" },
  { expression: "仕事", reading: "しごと", meaning: "work, job", pl: "praca" },
  { expression: "辞書", reading: "じしょ", meaning: "dictionary", pl: "słownik" },
  { expression: "静か", reading: "しずか", meaning: "quiet, calm", pl: "cichy, spokojny" },
  { expression: "下", reading: "した", meaning: "under, below", pl: "pod, poniżej" },
  { expression: "七", reading: "しち", meaning: "seven", pl: "siedem" },
  { expression: "質問", reading: "しつもん", meaning: "question, inquiry", pl: "pytanie" },
  { expression: "自転車", reading: "じてんしゃ", meaning: "bicycle", pl: "rower" },
  { expression: "自動車", reading: "じどうしゃ", meaning: "automobile", pl: "samochód" },
  { expression: "死ぬ", reading: "しぬ", meaning: "to die", pl: "umierać" },
  { expression: "字引", reading: "じびき", meaning: "dictionary", pl: "słownik" },
  { expression: "自分", reading: "じぶん", meaning: "myself, oneself", pl: "ja sam, siebie" },
  { expression: "閉まる", reading: "しまる", meaning: "to close (v.i.)", pl: "zamykać się" },
  { expression: "閉める", reading: "しめる", meaning: "to close, to shut", pl: "zamykać" },
  { expression: "締める", reading: "しめる", meaning: "to tie, to fasten", pl: "wiązać, zapinać" },
  { expression: "じゃ; じゃあ", reading: "じゃ; じゃあ", meaning: "well, well then", pl: "no to, więc" },
  { expression: "写真", reading: "しゃしん", meaning: "a photograph", pl: "zdjęcie" },
  { expression: "シャツ", reading: "シャツ", meaning: "shirt", pl: "koszula" },
  { expression: "シャワー", reading: "シャワー", meaning: "shower", pl: "prysznic" },
  { expression: "十", reading: "じゅう", meaning: "ten", pl: "dziesięć" },
  { expression: "～中", reading: "～じゅう", meaning: "during, while", pl: "podczas, w trakcie" },
  { expression: "～週間", reading: "～しゅうかん", meaning: "~ weeks", pl: "~ tygodni" },
  { expression: "授業", reading: "じゅぎょう", meaning: "a class (school)", pl: "lekcja, zajęcia" },
  { expression: "宿題", reading: "しゅくだい", meaning: "homework", pl: "zadanie domowe" },
  { expression: "上手", reading: "じょうず", meaning: "skillful, good at", pl: "biegły, dobry w" },
  { expression: "丈夫", reading: "じょうぶ", meaning: "strong, durable", pl: "mocny, wytrzymały" },
  { expression: "醤油", reading: "しょうゆ", meaning: "soy sauce", pl: "sos sojowy" },
  { expression: "食堂", reading: "しょくどう", meaning: "cafeteria, dining hall", pl: "stołówka, jadalnia" },
  { expression: "知る", reading: "しる", meaning: "to know, to understand", pl: "wiedzieć, znać" },
  { expression: "白", reading: "しろ", meaning: "white", pl: "biały (rzecz.)" },
  { expression: "白い", reading: "しろい", meaning: "white", pl: "biały" },
  { expression: "～人", reading: "～じん", meaning: "counter for people", pl: "licznik osób" },
  { expression: "新聞", reading: "しんぶん", meaning: "newspaper", pl: "gazeta" },
  { expression: "水曜日", reading: "すいようび", meaning: "Wednesday", pl: "środa" },
  { expression: "吸う", reading: "すう", meaning: "to breathe in, to suck", pl: "wdychać, ssać" },
  { expression: "スカート", reading: "スカート", meaning: "skirt", pl: "spódnica" },
  { expression: "好き", reading: "すき", meaning: "liking, love", pl: "lubić, kochać" },
  { expression: "～すぎ", reading: "～すぎ", meaning: "too much", pl: "zbyt, za dużo" },
  { expression: "少ない", reading: "すくない", meaning: "a little; a few", pl: "mało, niewiele" },
  { expression: "すぐに", reading: "すぐに", meaning: "immediately, soon", pl: "natychmiast, zaraz" },
  { expression: "少し", reading: "すこし", meaning: "a little, few", pl: "trochę, troszeczkę" },
  { expression: "涼しい", reading: "すずしい", meaning: "cool, refreshing", pl: "chłodny, orzeźwiający" },
  { expression: "～ずつ", reading: "～ずつ", meaning: "at a time", pl: "po (kawałku)" },
  { expression: "ストーブ", reading: "ストーブ", meaning: "heater", pl: "grzejnik, piecyk" },
  { expression: "スプーン", reading: "スプーン", meaning: "spoon", pl: "łyżka" },
  { expression: "スポーツ", reading: "スポーツ", meaning: "sport(s)", pl: "sport" },
  { expression: "ズボン", reading: "ズボン", meaning: "trousers", pl: "spodnie" },
  { expression: "住む", reading: "すむ", meaning: "to live in, to reside", pl: "mieszkać" },
  { expression: "する", reading: "する", meaning: "to do", pl: "robić" },
  { expression: "座る", reading: "すわる", meaning: "to sit", pl: "siedzieć, siadać" },
  { expression: "背", reading: "せい", meaning: "height, stature", pl: "wzrost" },
  { expression: "生徒", reading: "せいと", meaning: "student; pupil", pl: "uczeń" },
  { expression: "セーター", reading: "セーター", meaning: "sweater", pl: "sweter" },
  { expression: "石鹸", reading: "せっけん", meaning: "soap", pl: "mydło" },
  { expression: "背広", reading: "せびろ", meaning: "men's suit", pl: "garnitur" },
  { expression: "狭い", reading: "せまい", meaning: "narrow, not spacious", pl: "wąski, ciasny" },
  { expression: "ゼロ", reading: "ゼロ", meaning: "zero", pl: "zero" },
  { expression: "千", reading: "せん", meaning: "thousand", pl: "tysiąc" },
  { expression: "先月", reading: "せんげつ", meaning: "last month", pl: "zeszły miesiąc" },
  { expression: "先週", reading: "せんしゅう", meaning: "last week", pl: "zeszły tydzień" },
  { expression: "先生", reading: "せんせい", meaning: "teacher, professor", pl: "nauczyciel, profesor" },
  { expression: "洗濯", reading: "せんたく", meaning: "washing, laundry", pl: "pranie" },
  { expression: "全部", reading: "ぜんぶ", meaning: "all, entire", pl: "wszystko, całość" },
  { expression: "そう; そうです", reading: "そう; そうです", meaning: "yes; appears so", pl: "tak; wygląda na to" },
  { expression: "掃除", reading: "そうじ (する)", meaning: "cleaning, sweeping", pl: "sprzątanie" },
  { expression: "そうして; そして", reading: "そうして; そして", meaning: "and, like that", pl: "i, potem" },
  { expression: "そこ", reading: "そこ", meaning: "there", pl: "tam" },
  { expression: "そちら", reading: "そちら", meaning: "over there", pl: "tamta strona" },
  { expression: "そっち", reading: "そっち", meaning: "over there", pl: "tam (potocz.)" },
  { expression: "外", reading: "そと", meaning: "outside", pl: "na zewnątrz" },
  { expression: "その", reading: "その", meaning: "that", pl: "ten, ta, to (obok)" },
  { expression: "そば", reading: "そば", meaning: "near; soba noodles", pl: "blisko; makaron soba" },
  { expression: "空", reading: "そら", meaning: "sky", pl: "niebo" },
  { expression: "それ", reading: "それ", meaning: "that one", pl: "to (tamto)" },
  { expression: "それから", reading: "それから", meaning: "and then, after that", pl: "a potem, następnie" },
  { expression: "それでは", reading: "それでは", meaning: "well then...", pl: "w takim razie..." },
  { expression: "～台", reading: "～だい", meaning: "counter for vehicles", pl: "licznik pojazdów" },
  { expression: "大学", reading: "だいがく", meaning: "university", pl: "uniwersytet" },
  { expression: "大使館", reading: "たいしかん", meaning: "embassy", pl: "ambasada" },
  { expression: "大丈夫", reading: "だいじょうぶ", meaning: "it's ok, no worries", pl: "w porządku, nie martw się" },
  { expression: "大好き", reading: "だいすき", meaning: "like very much", pl: "bardzo lubić, uwielbiać" },
  { expression: "大切", reading: "たいせつ", meaning: "important", pl: "ważny" },
  { expression: "台所", reading: "だいどころ", meaning: "kitchen", pl: "kuchnia" },
  { expression: "大変", reading: "たいへん", meaning: "very; difficult", pl: "bardzo; trudny" },
  { expression: "高い", reading: "たかい", meaning: "tall; expensive", pl: "wysoki; drogi" },
  { expression: "～だけ", reading: "～だけ", meaning: "only ~, just ~", pl: "tylko ~" },
  { expression: "沢山", reading: "たくさん", meaning: "many, much", pl: "dużo, wiele" },
  { expression: "タクシー", reading: "タクシー", meaning: "taxi", pl: "taksówka" },
  { expression: "出す", reading: "だす", meaning: "to take out; to hand in", pl: "wyjmować; oddawać" },
  { expression: "～たち", reading: "～たち", meaning: "plural suffix", pl: "przyrostek liczby mnogiej" },
  { expression: "立つ", reading: "たつ", meaning: "to stand up", pl: "wstawać, stać" },
  { expression: "たて", reading: "たて", meaning: "length, height", pl: "długość, wysokość" },
  { expression: "建物", reading: "たてもの", meaning: "building", pl: "budynek" },
  { expression: "楽しい", reading: "たのしい", meaning: "enjoyable, fun", pl: "przyjemny, fajny" },
  { expression: "頼む", reading: "たのむ", meaning: "to request", pl: "prosić" },
  { expression: "たばこ", reading: "たばこ", meaning: "tobacco, cigarettes", pl: "papierosy, tytoń" },
  { expression: "多分", reading: "たぶん", meaning: "perhaps, probably", pl: "chyba, prawdopodobnie" },
  { expression: "食べ物", reading: "たべもの", meaning: "food", pl: "jedzenie" },
  { expression: "食べる", reading: "たべる", meaning: "to eat", pl: "jeść" },
  { expression: "卵", reading: "たまご", meaning: "egg", pl: "jajko" },
  { expression: "誰", reading: "だれ", meaning: "who", pl: "kto" },
  { expression: "誰か", reading: "だれか", meaning: "someone", pl: "ktoś" },
  { expression: "誕生日", reading: "たんじょうび", meaning: "birthday", pl: "urodziny" },
  { expression: "段々", reading: "だんだん", meaning: "gradually", pl: "stopniowo" },
  { expression: "小さい", reading: "ちいさい", meaning: "small, little", pl: "mały" },
  { expression: "小さな", reading: "ちいさな", meaning: "small, little", pl: "mały, malutki" },
  { expression: "近い", reading: "ちかい", meaning: "near, close", pl: "bliski, niedaleko" },
  { expression: "違う", reading: "ちがう", meaning: "to be different; wrong", pl: "różnić się; błędny" },
  { expression: "近く", reading: "ちかく", meaning: "nearby", pl: "w pobliżu" },
  { expression: "地下鉄", reading: "ちかてつ", meaning: "subway", pl: "metro" },
  { expression: "地図", reading: "ちず", meaning: "a map", pl: "mapa" },
  { expression: "父", reading: "ちち", meaning: "(my) father", pl: "(mój) ojciec" },
  { expression: "茶色", reading: "ちゃいろ", meaning: "brown", pl: "brązowy (rzecz.)" },
  { expression: "茶碗", reading: "ちゃわん", meaning: "rice bowl", pl: "miseczka do ryżu" },
  { expression: "～中", reading: "～ちゅう", meaning: "during, while", pl: "w trakcie" },
  { expression: "丁度", reading: "ちょうど", meaning: "just, exactly", pl: "dokładnie, akurat" },
  { expression: "ちょっと", reading: "ちょっと", meaning: "a little", pl: "trochę, chwileczkę" },
  { expression: "一日", reading: "ついたち", meaning: "first day of month", pl: "pierwszy dzień miesiąca" },
  { expression: "使う", reading: "つかう", meaning: "to use", pl: "używać" },
  { expression: "疲れる", reading: "つかれる", meaning: "to get tired", pl: "męczyć się" },
  { expression: "次", reading: "つぎ", meaning: "next", pl: "następny" },
  { expression: "着く", reading: "つく", meaning: "to arrive at", pl: "przybywać, docierać" },
  { expression: "机", reading: "つくえ", meaning: "desk", pl: "biurko" },
  { expression: "作る", reading: "つくる", meaning: "to make, to create", pl: "robić, tworzyć" },
  { expression: "つける", reading: "つける", meaning: "to turn on (light)", pl: "włączać (światło)" },
  { expression: "勤める", reading: "つとめる", meaning: "to work (for)", pl: "pracować (w firmie)" },
  { expression: "つまらない", reading: "つまらない", meaning: "boring, dull", pl: "nudny" },
  { expression: "冷たい", reading: "つめたい", meaning: "cold (things)", pl: "zimny (przedmioty)" },
  { expression: "強い", reading: "つよい", meaning: "strong, powerful", pl: "silny, potężny" },
  { expression: "手", reading: "て", meaning: "hand", pl: "ręka, dłoń" },
  { expression: "テープ", reading: "テープ", meaning: "tape", pl: "taśma" },
  { expression: "テープレコーダー", reading: "テープレコーダー", meaning: "tape recorder", pl: "magnetofon" },
  { expression: "テーブル", reading: "テーブル", meaning: "table", pl: "stół" },
  { expression: "出かける", reading: "でかける", meaning: "to go out", pl: "wychodzić" },
  { expression: "手紙", reading: "てがみ", meaning: "letter", pl: "list" },
  { expression: "できる", reading: "できる", meaning: "to be able to", pl: "móc, potrafić" },
  { expression: "出口", reading: "でぐち", meaning: "an exit", pl: "wyjście" },
  { expression: "テスト", reading: "テスト", meaning: "test", pl: "test" },
  { expression: "では", reading: "では", meaning: "then, well", pl: "więc, no to" },
  { expression: "デパート", reading: "デパート", meaning: "department store", pl: "dom towarowy" },
  { expression: "でも", reading: "でも", meaning: "but, however", pl: "ale, jednak" },
  { expression: "出る", reading: "でる", meaning: "to appear, to leave", pl: "wychodzić, pojawiać się" },
  { expression: "テレビ", reading: "テレビ", meaning: "television", pl: "telewizja" },
  { expression: "天気", reading: "てんき", meaning: "weather", pl: "pogoda" },
  { expression: "電気", reading: "でんき", meaning: "electricity, light", pl: "elektryczność, światło" },
  { expression: "電車", reading: "でんしゃ", meaning: "electric train", pl: "pociąg elektryczny" },
  { expression: "電話", reading: "でんわ", meaning: "a telephone", pl: "telefon" },
  { expression: "戸", reading: "と", meaning: "door (Japanese style)", pl: "drzwi (japońskie)" },
  { expression: "～度", reading: "～ど", meaning: "~ degree; ~ times", pl: "~ stopni; ~ razy" },
  { expression: "ドア", reading: "ドア", meaning: "door (Western style)", pl: "drzwi (zachodnie)" },
  { expression: "トイレ", reading: "トイレ", meaning: "bathroom; toilet", pl: "toaleta" },
  { expression: "どう", reading: "どう", meaning: "how", pl: "jak" },
  { expression: "どうして", reading: "どうして", meaning: "why", pl: "dlaczego" },
  { expression: "どうぞ", reading: "どうぞ", meaning: "please, by all means", pl: "proszę (zaproszenie)" },
  { expression: "動物", reading: "どうぶつ", meaning: "animal", pl: "zwierzę" },
  { expression: "どうも", reading: "どうも", meaning: "thank you; somehow", pl: "dzięki; jakoś" },
  { expression: "十", reading: "(〜を) とお", meaning: "ten", pl: "dziesięć" },
  { expression: "遠い", reading: "とおい", meaning: "far, distant", pl: "daleki" },
  { expression: "十日", reading: "とおか", meaning: "ten days; tenth day", pl: "dziesięć dni; dziesiąty" },
  { expression: "～時", reading: "～とき", meaning: "at the time of ~", pl: "kiedy ~, gdy ~" },
  { expression: "時々", reading: "ときどき", meaning: "sometimes", pl: "czasami" },
  { expression: "時計", reading: "とけい", meaning: "a watch; a clock", pl: "zegarek; zegar" },
  { expression: "どこ", reading: "どこ", meaning: "where", pl: "gdzie" },
  { expression: "所", reading: "ところ", meaning: "place", pl: "miejsce" },
  { expression: "年", reading: "とし", meaning: "year, age", pl: "rok, wiek" },
  { expression: "図書館", reading: "としょかん", meaning: "library", pl: "biblioteka" },
  { expression: "どちら", reading: "どちら", meaning: "which; where (polite)", pl: "który; gdzie (grzeczn.)" },
  { expression: "どっち", reading: "どっち", meaning: "which one", pl: "który (potocz.)" },
  { expression: "とても", reading: "とても", meaning: "very (much)", pl: "bardzo" },
  { expression: "どなた", reading: "どなた", meaning: "who (polite)", pl: "kto (grzeczn.)" },
  { expression: "隣", reading: "となり", meaning: "next to", pl: "obok, sąsiedni" },
  { expression: "どの", reading: "どの", meaning: "which", pl: "który" },
  { expression: "飛ぶ", reading: "とぶ", meaning: "to fly, to hop", pl: "latać, skakać" },
  { expression: "止まる", reading: "とまる", meaning: "to stop", pl: "zatrzymać się" },
  { expression: "友達", reading: "ともだち", meaning: "friend", pl: "przyjaciel" },
  { expression: "土曜日", reading: "どようび", meaning: "Saturday", pl: "sobota" },
  { expression: "鳥", reading: "とり", meaning: "bird; chicken", pl: "ptak; kurczak" },
  { expression: "鶏肉", reading: "とりにく", meaning: "chicken meat", pl: "mięso z kurczaka" },
  { expression: "取る", reading: "とる", meaning: "to take (a class)", pl: "brać (kurs); zdobywać" },
  { expression: "撮る", reading: "とる", meaning: "to take (a photo)", pl: "robić (zdjęcie)" },
  { expression: "どれ", reading: "どれ", meaning: "which one", pl: "które" },
  { expression: "どんな", reading: "どんな", meaning: "what kind of", pl: "jaki, jakiego rodzaju" },
  { expression: "ない", reading: "ない", meaning: "there isn't", pl: "nie ma" },
  { expression: "ナイフ", reading: "ナイフ", meaning: "knife", pl: "nóż" },
  { expression: "中", reading: "なか", meaning: "inside, middle", pl: "wewnątrz, środek" },
  { expression: "長い", reading: "ながい", meaning: "long, lengthy", pl: "długi" },
  { expression: "鳴く", reading: "なく", meaning: "to make sound (animal)", pl: "wydawać dźwięk (zwierzę)" },
  { expression: "無くす", reading: "なくす", meaning: "to lose something", pl: "zgubić coś" },
  { expression: "なぜ", reading: "なぜ", meaning: "why", pl: "dlaczego" },
  { expression: "夏", reading: "なつ", meaning: "summer", pl: "lato" },
  { expression: "夏休み", reading: "なつやすみ", meaning: "summer vacation", pl: "wakacje letnie" },
  { expression: "～など", reading: "～など", meaning: "et cetera", pl: "i tak dalej" },
  { expression: "七つ", reading: "ななつ", meaning: "seven things", pl: "siedem (rzeczy)" },
  { expression: "何", reading: "なん; なに", meaning: "what", pl: "co" },
  { expression: "七日", reading: "なのか", meaning: "seven days; seventh day", pl: "siedem dni; siódmy" },
  { expression: "名前", reading: "なまえ", meaning: "name", pl: "imię, nazwa" },
  { expression: "習う", reading: "ならう", meaning: "to learn", pl: "uczyć się" },
  { expression: "並ぶ", reading: "ならぶ", meaning: "to line up", pl: "ustawiać się w kolejce" },
  { expression: "並べる", reading: "ならべる", meaning: "to line up (v.t.)", pl: "ustawiać w rzędzie" },
  { expression: "なる", reading: "なる", meaning: "to become", pl: "stawać się" },
  { expression: "何～", reading: "なん～", meaning: "what sort of ~", pl: "jaki ~, ile ~" },
  { expression: "二", reading: "に", meaning: "two", pl: "dwa" },
  { expression: "にぎやか", reading: "にぎやか", meaning: "bustling, busy", pl: "tętniący życiem, gwarny" },
  { expression: "肉", reading: "にく", meaning: "meat", pl: "mięso" },
  { expression: "西", reading: "にし", meaning: "west", pl: "zachód" },
  { expression: "～日", reading: "～にち", meaning: "~ days", pl: "~ dni" },
  { expression: "日曜日", reading: "にちようび", meaning: "Sunday", pl: "niedziela" },
  { expression: "荷物", reading: "にもつ", meaning: "luggage", pl: "bagaż" },
  { expression: "ニュース", reading: "ニュース", meaning: "news", pl: "wiadomości" },
  { expression: "庭", reading: "にわ", meaning: "garden", pl: "ogród" },
  { expression: "～人", reading: "～にん", meaning: "counter for people", pl: "~ osób" },
  { expression: "脱ぐ", reading: "ぬぐ", meaning: "to take off (clothes)", pl: "zdejmować (ubranie)" },
  { expression: "温い", reading: "ぬるい", meaning: "lukewarm", pl: "letni, ciepławy" },
  { expression: "ネクタイ", reading: "ネクタイ", meaning: "tie, necktie", pl: "krawat" },
  { expression: "猫", reading: "ねこ", meaning: "cat", pl: "kot" },
  { expression: "寝る", reading: "ねる", meaning: "to sleep, to go to bed", pl: "spać, kłaść się" },
  { expression: "～年", reading: "～ねん", meaning: "~ years", pl: "~ lat" },
  { expression: "ノート", reading: "ノート", meaning: "notebook", pl: "zeszyt" },
  { expression: "登る", reading: "のぼる", meaning: "to climb", pl: "wspinać się" },
  { expression: "飲み物", reading: "のみもの", meaning: "drink, beverage", pl: "napój" },
  { expression: "飲む", reading: "のむ", meaning: "to drink", pl: "pić" },
  { expression: "乗る", reading: "のる", meaning: "to get on, to ride", pl: "wsiadać, jechać" },
  { expression: "歯", reading: "は", meaning: "tooth", pl: "ząb" },
  { expression: "パーティー", reading: "パーティー", meaning: "a party", pl: "impreza, przyjęcie" },
  { expression: "はい", reading: "はい", meaning: "yes", pl: "tak" },
  { expression: "～杯", reading: "～はい", meaning: "counter for cupfuls", pl: "licznik filiżanek" },
  { expression: "灰皿", reading: "はいざら", meaning: "ashtray", pl: "popielniczka" },
  { expression: "入る", reading: "はいる", meaning: "to enter", pl: "wchodzić" },
  { expression: "葉書", reading: "はがき", meaning: "postcard", pl: "pocztówka" },
  { expression: "はく", reading: "はく", meaning: "to put on (below waist)", pl: "zakładać (na nogi)" },
  { expression: "箱", reading: "はこ", meaning: "box", pl: "pudełko" },
  { expression: "橋", reading: "はし", meaning: "bridge", pl: "most" },
  { expression: "箸", reading: "はし", meaning: "chopsticks", pl: "pałeczki" },
  { expression: "始まる", reading: "はじまる", meaning: "to begin", pl: "zaczynać się" },
  { expression: "初め; 始め", reading: "はじめ", meaning: "beginning, start", pl: "początek" },
  { expression: "初めて", reading: "はじめて", meaning: "for the first time", pl: "po raz pierwszy" },
  { expression: "走る", reading: "はしる", meaning: "to run", pl: "biegać" },
  { expression: "バス", reading: "バス", meaning: "bus", pl: "autobus" },
  { expression: "バター", reading: "バター", meaning: "butter", pl: "masło" },
  { expression: "二十歳", reading: "はたち", meaning: "20 years old", pl: "20 lat" },
  { expression: "働く", reading: "はたらく", meaning: "to work", pl: "pracować" },
  { expression: "八", reading: "はち", meaning: "eight", pl: "osiem" },
  { expression: "二十日", reading: "はつか", meaning: "twenty days; twentieth", pl: "dwadzieścia dni; dwudziesty" },
  { expression: "花", reading: "はな", meaning: "flower", pl: "kwiat" },
  { expression: "鼻", reading: "はな", meaning: "nose", pl: "nos" },
  { expression: "話", reading: "はなし", meaning: "talk, story", pl: "rozmowa, opowieść" },
  { expression: "話す", reading: "はなす", meaning: "to speak", pl: "rozmawiać, mówić" },
  { expression: "母", reading: "はは", meaning: "(my) mother", pl: "(moja) matka" },
  { expression: "早い", reading: "はやい", meaning: "early", pl: "wczesny" },
  { expression: "速い", reading: "はやい", meaning: "fast, quick", pl: "szybki" },
  { expression: "春", reading: "はる", meaning: "spring", pl: "wiosna" },
  { expression: "貼る", reading: "はる", meaning: "to paste, to attach", pl: "naklejać, przyklejać" },
  { expression: "晴れ", reading: "はれ", meaning: "clear weather", pl: "pogodna pogoda" },
  { expression: "晴れる", reading: "はれる", meaning: "to be sunny", pl: "być słonecznie" },
  { expression: "半", reading: "はん", meaning: "half", pl: "pół" },
  { expression: "晩", reading: "ばん", meaning: "evening", pl: "wieczór" },
  { expression: "～番", reading: "～ばん", meaning: "~th (ranking)", pl: "~ numer, ~ pozycja" },
  { expression: "パン", reading: "パン", meaning: "bread", pl: "chleb" },
  { expression: "ハンカチ", reading: "ハンカチ", meaning: "handkerchief", pl: "chusteczka" },
  { expression: "番号", reading: "ばんごう", meaning: "number", pl: "numer" },
  { expression: "晩御飯", reading: "ばんごはん", meaning: "dinner", pl: "kolacja" },
  { expression: "半分", reading: "はんぶん", meaning: "half", pl: "połowa" },
  { expression: "東", reading: "ひがし", meaning: "east", pl: "wschód" },
  { expression: "～匹", reading: "～ひき", meaning: "counter for small animals", pl: "licznik małych zwierząt" },
  { expression: "引く", reading: "ひく", meaning: "to pull; subtract", pl: "ciągnąć; odejmować" },
  { expression: "弾く", reading: "ひく", meaning: "to play (instrument)", pl: "grać (na instrumencie)" },
  { expression: "低い", reading: "ひくい", meaning: "short, low", pl: "niski" },
  { expression: "飛行機", reading: "ひこうき", meaning: "airplane", pl: "samolot" },
  { expression: "左", reading: "ひだり", meaning: "left hand side", pl: "lewa strona" },
  { expression: "人", reading: "ひと", meaning: "man, person", pl: "człowiek, osoba" },
  { expression: "一つ", reading: "ひとつ", meaning: "one thing", pl: "jedna (rzecz)" },
  { expression: "一月", reading: "ひとつき", meaning: "one month", pl: "jeden miesiąc" },
  { expression: "一人", reading: "ひとり", meaning: "one person", pl: "jedna osoba" },
  { expression: "暇", reading: "ひま", meaning: "free time, leisure", pl: "wolny czas" },
  { expression: "百", reading: "ひゃく", meaning: "hundred", pl: "sto" },
  { expression: "病院", reading: "びょういん", meaning: "hospital", pl: "szpital" },
  { expression: "病気", reading: "びょうき", meaning: "illness; sickness", pl: "choroba" },
  { expression: "平仮名", reading: "ひらがな", meaning: "hiragana", pl: "hiragana" },
  { expression: "昼", reading: "ひる", meaning: "noon, daytime", pl: "południe, dzień" },
  { expression: "昼御飯", reading: "ひるごはん", meaning: "lunch", pl: "obiad, lunch" },
  { expression: "広い", reading: "ひろい", meaning: "spacious; wide", pl: "przestronny; szeroki" },
  { expression: "フィルム", reading: "フィルム", meaning: "film (roll)", pl: "klisza, film" },
  { expression: "封筒", reading: "ふうとう", meaning: "envelope", pl: "koperta" },
  { expression: "プール", reading: "プール", meaning: "swimming pool", pl: "basen" },
  { expression: "フォーク", reading: "フォーク", meaning: "fork", pl: "widelec" },
  { expression: "吹く", reading: "ふく", meaning: "to blow (wind)", pl: "wiać" },
  { expression: "服", reading: "ふく", meaning: "clothes", pl: "ubranie" },
  { expression: "二つ", reading: "ふたつ", meaning: "two things", pl: "dwie (rzeczy)" },
  { expression: "豚肉", reading: "ぶたにく", meaning: "pork", pl: "wieprzowina" },
  { expression: "二人", reading: "ふたり", meaning: "two people", pl: "dwie osoby" },
  { expression: "二日", reading: "ふつか", meaning: "two days; second day", pl: "dwa dni; drugi dzień" },
  { expression: "太い", reading: "ふとい", meaning: "fat, thick", pl: "gruby" },
  { expression: "冬", reading: "ふゆ", meaning: "winter", pl: "zima" },
  { expression: "降る", reading: "ふる", meaning: "to fall (rain, snow)", pl: "padać (deszcz, śnieg)" },
  { expression: "古い", reading: "ふるい", meaning: "old (objects)", pl: "stary (przedmioty)" },
  { expression: "～分", reading: "～ふん", meaning: "~ minutes", pl: "~ minut" },
  { expression: "文章", reading: "ぶんしょう", meaning: "sentence, text", pl: "zdanie, tekst" },
  { expression: "ページ", reading: "ページ", meaning: "a page", pl: "strona" },
  { expression: "下手", reading: "へた", meaning: "unskillful, poor", pl: "niezdarny, słaby w" },
  { expression: "ベッド", reading: "ベッド", meaning: "bed", pl: "łóżko" },
  { expression: "ペット", reading: "ペット", meaning: "pet", pl: "zwierzak domowy" },
  { expression: "部屋", reading: "へや", meaning: "a room", pl: "pokój" },
  { expression: "辺", reading: "へん", meaning: "area, vicinity", pl: "okolica" },
  { expression: "ペン", reading: "ペン", meaning: "pen", pl: "długopis" },
  { expression: "勉強", reading: "べんきょう (する)", meaning: "study", pl: "nauka, uczenie się" },
  { expression: "便利", reading: "べんり", meaning: "convenient, handy", pl: "wygodny, przydatny" },
  { expression: "帽子", reading: "ぼうし", meaning: "hat; cap", pl: "czapka, kapelusz" },
  { expression: "ボールペン", reading: "ボールペン", meaning: "ball-point pen", pl: "długopis" },
  { expression: "外", reading: "ほか", meaning: "other, the rest", pl: "inny, reszta" },
  { expression: "ポケット", reading: "ポケット", meaning: "pocket", pl: "kieszeń" },
  { expression: "欲しい", reading: "ほしい", meaning: "to want", pl: "chcieć, pragnąć" },
  { expression: "ポスト", reading: "ポスト", meaning: "mailbox", pl: "skrzynka pocztowa" },
  { expression: "細い", reading: "ほそい", meaning: "thin, slender", pl: "cienki, szczupły" },
  { expression: "ボタン", reading: "ボタン", meaning: "button", pl: "guzik, przycisk" },
  { expression: "ホテル", reading: "ホテル", meaning: "hotel", pl: "hotel" },
  { expression: "本", reading: "ほん", meaning: "book", pl: "książka" },
  { expression: "～本", reading: "～ほん", meaning: "counter for long things", pl: "licznik długich rzeczy" },
  { expression: "本棚", reading: "ほんだな", meaning: "bookshelf", pl: "półka na książki" },
  { expression: "本当", reading: "ほんとう", meaning: "real, true", pl: "prawdziwy, naprawdę" },
  { expression: "～枚", reading: "～まい", meaning: "counter for flat things", pl: "licznik płaskich rzeczy" },
  { expression: "毎朝", reading: "まいあさ", meaning: "every morning", pl: "każdego ranka" },
  { expression: "毎月", reading: "まいげつ; まいつき", meaning: "every month", pl: "co miesiąc" },
  { expression: "毎週", reading: "まいしゅう", meaning: "every week", pl: "co tydzień" },
  { expression: "毎日", reading: "まいにち", meaning: "every day", pl: "codziennie" },
  { expression: "毎年", reading: "まいねん; まいとし", meaning: "every year", pl: "co roku" },
  { expression: "毎晩", reading: "まいばん", meaning: "every night", pl: "co wieczór" },
  { expression: "前", reading: "まえ", meaning: "before, in front", pl: "przed, z przodu" },
  { expression: "～前", reading: "～まえ", meaning: "in front of ~", pl: "przed ~" },
  { expression: "曲る", reading: "まがる", meaning: "to turn, to bend", pl: "skręcać" },
  { expression: "まずい", reading: "まずい", meaning: "terrible (food)", pl: "niesmaczny" },
  { expression: "また", reading: "また", meaning: "again; furthermore", pl: "znowu; ponadto" },
  { expression: "まだ", reading: "まだ", meaning: "yet, still", pl: "jeszcze" },
  { expression: "町", reading: "まち", meaning: "town; city", pl: "miasto, miasteczko" },
  { expression: "待つ", reading: "まつ", meaning: "to wait", pl: "czekać" },
  { expression: "まっすぐ", reading: "まっすぐ", meaning: "straight ahead", pl: "prosto" },
  { expression: "マッチ", reading: "マッチ", meaning: "match", pl: "zapałka" },
  { expression: "窓", reading: "まど", meaning: "window", pl: "okno" },
  { expression: "丸い; 円い", reading: "まるい", meaning: "round, circular", pl: "okrągły" },
  { expression: "万", reading: "まん", meaning: "ten thousand", pl: "dziesięć tysięcy" },
  { expression: "万年筆", reading: "まんねんひつ", meaning: "fountain pen", pl: "wieczne pióro" },
  { expression: "磨く", reading: "みがく", meaning: "to brush (teeth); to polish", pl: "myć (zęby); polerować" },
  { expression: "右", reading: "みぎ", meaning: "right hand side", pl: "prawa strona" },
  { expression: "短い", reading: "みじかい", meaning: "short (length)", pl: "krótki" },
  { expression: "水", reading: "みず", meaning: "water", pl: "woda" },
  { expression: "店", reading: "みせ", meaning: "store, shop", pl: "sklep" },
  { expression: "見せる", reading: "みせる", meaning: "to show, to display", pl: "pokazywać" },
  { expression: "道", reading: "みち", meaning: "road, street", pl: "droga, ulica" },
  { expression: "三日", reading: "みっか", meaning: "three days; third day", pl: "trzy dni; trzeci dzień" },
  { expression: "三つ", reading: "みっつ", meaning: "three things", pl: "trzy (rzeczy)" },
  { expression: "緑", reading: "みどり", meaning: "green", pl: "zielony" },
  { expression: "皆さん", reading: "みなさん", meaning: "everyone", pl: "wszyscy (grzeczn.)" },
  { expression: "南", reading: "みなみ", meaning: "south", pl: "południe (kierunek)" },
  { expression: "耳", reading: "みみ", meaning: "ear", pl: "ucho" },
  { expression: "見る", reading: "みる", meaning: "to see, to look", pl: "widzieć, patrzeć" },
  { expression: "みんな", reading: "みんな", meaning: "everyone", pl: "wszyscy" },
  { expression: "六日", reading: "むいか", meaning: "six days; sixth day", pl: "sześć dni; szósty" },
  { expression: "向こう", reading: "むこう", meaning: "beyond, over there", pl: "po drugiej stronie, tam" },
  { expression: "難しい", reading: "むずかしい", meaning: "difficult", pl: "trudny" },
  { expression: "六つ", reading: "むっつ", meaning: "six things", pl: "sześć (rzeczy)" },
  { expression: "村", reading: "むら", meaning: "village", pl: "wieś" },
  { expression: "目", reading: "め", meaning: "eye(s)", pl: "oko (oczy)" },
  { expression: "メートル", reading: "メートル", meaning: "meter", pl: "metr" },
  { expression: "眼鏡", reading: "めがね", meaning: "eye glasses", pl: "okulary" },
  { expression: "もう", reading: "もう", meaning: "already; more", pl: "już; więcej" },
  { expression: "木曜日", reading: "もくようび", meaning: "Thursday", pl: "czwartek" },
  { expression: "もしもし", reading: "もしもし", meaning: "Hello? (phone)", pl: "Halo? (telefon)" },
  { expression: "持つ", reading: "もつ", meaning: "to hold, to carry", pl: "trzymać, nosić" },
  { expression: "もっと", reading: "もっと", meaning: "more", pl: "więcej, bardziej" },
  { expression: "物", reading: "もの", meaning: "thing (object)", pl: "rzecz, przedmiot" },
  { expression: "門", reading: "もん", meaning: "gate", pl: "brama" },
  { expression: "問題", reading: "もんだい", meaning: "a problem", pl: "problem, pytanie" },
  { expression: "～屋", reading: "～や", meaning: "~ shop", pl: "sklep z ~" },
  { expression: "八百屋", reading: "やおや", meaning: "greengrocer", pl: "warzywniak" },
  { expression: "野菜", reading: "やさい", meaning: "vegetable", pl: "warzywo" },
  { expression: "易しい", reading: "やさしい", meaning: "easy, simple", pl: "łatwy, prosty" },
  { expression: "安い", reading: "やすい", meaning: "inexpensive, cheap", pl: "tani" },
  { expression: "休み", reading: "やすみ", meaning: "holiday; day off", pl: "wolne; dzień wolny" },
  { expression: "休む", reading: "やすむ", meaning: "to rest", pl: "odpoczywać" },
  { expression: "八つ", reading: "やっつ", meaning: "eight things", pl: "osiem (rzeczy)" },
  { expression: "山", reading: "やま", meaning: "mountain", pl: "góra" },
  { expression: "やる", reading: "やる", meaning: "to do; to give", pl: "robić; dawać" },
  { expression: "夕方", reading: "ゆうがた", meaning: "late afternoon, evening", pl: "późne popołudnie, wieczór" },
  { expression: "夕飯", reading: "ゆうはん", meaning: "dinner, supper", pl: "kolacja" },
  { expression: "郵便局", reading: "ゆうびんきょく", meaning: "post office", pl: "poczta" },
  { expression: "昨夜", reading: "ゆうべ", meaning: "last night", pl: "wczoraj wieczorem" },
  { expression: "有名", reading: "ゆうめい", meaning: "famous", pl: "sławny, znany" },
  { expression: "雪", reading: "ゆき", meaning: "snow", pl: "śnieg" },
  { expression: "ゆっくりと", reading: "ゆっくりと", meaning: "slowly, at ease", pl: "powoli, spokojnie" },
  { expression: "八日", reading: "ようか", meaning: "eight days; eighth day", pl: "osiem dni; ósmy" },
  { expression: "洋服", reading: "ようふく", meaning: "Western-style clothes", pl: "ubranie zachodnie" },
  { expression: "よく", reading: "よく", meaning: "often; well", pl: "często; dobrze" },
  { expression: "横", reading: "よこ", meaning: "beside; side; width", pl: "bok; strona; szerokość" },
  { expression: "四日", reading: "よっか", meaning: "four days; fourth day", pl: "cztery dni; czwarty" },
  { expression: "四つ", reading: "よっつ", meaning: "four things", pl: "cztery (rzeczy)" },
  { expression: "呼ぶ", reading: "よぶ", meaning: "to call; to invite", pl: "wołać; zapraszać" },
  { expression: "読む", reading: "よむ", meaning: "to read", pl: "czytać" },
  { expression: "夜", reading: "よる", meaning: "evening, night", pl: "wieczór, noc" },
  { expression: "弱い", reading: "よわい", meaning: "weak", pl: "słaby" },
  { expression: "来月", reading: "らいげつ", meaning: "next month", pl: "przyszły miesiąc" },
  { expression: "来週", reading: "らいしゅう", meaning: "next week", pl: "przyszły tydzień" },
  { expression: "来年", reading: "らいねん", meaning: "next year", pl: "przyszły rok" },
  { expression: "ラジオ", reading: "ラジオ", meaning: "radio", pl: "radio" },
  { expression: "ラジオカセ", reading: "ラジオカセ", meaning: "radio cassette player", pl: "radiomagnetofon" },
  { expression: "りっぱ", reading: "りっぱ", meaning: "splendid, fine", pl: "wspaniały, znakomity" },
  { expression: "留学生", reading: "りゅうがくせい", meaning: "international student", pl: "student zagraniczny" },
  { expression: "両親", reading: "りょうしん", meaning: "parents", pl: "rodzice" },
  { expression: "料理", reading: "りょうり", meaning: "cooking; cuisine", pl: "gotowanie; kuchnia" },
  { expression: "旅行", reading: "りょこう", meaning: "travel, trip", pl: "podróż, wycieczka" },
  { expression: "零", reading: "れい", meaning: "zero", pl: "zero" },
  { expression: "冷蔵庫", reading: "れいぞうこ", meaning: "refrigerator", pl: "lodówka" },
  { expression: "レコード", reading: "レコード", meaning: "record", pl: "płyta" },
  { expression: "レストラン", reading: "レストラン", meaning: "restaurant", pl: "restauracja" },
  { expression: "練習", reading: "れんしゅう (する)", meaning: "practice", pl: "ćwiczenie, praktyka" },
  { expression: "廊下", reading: "ろうか", meaning: "corridor", pl: "korytarz" },
  { expression: "六", reading: "ろく", meaning: "six", pl: "sześć" },
  { expression: "ワイシャツ", reading: "ワイシャツ", meaning: "business shirt", pl: "koszula (do garnituru)" },
  { expression: "若い", reading: "わかい", meaning: "young", pl: "młody" },
  { expression: "分かる", reading: "わかる", meaning: "to understand", pl: "rozumieć" },
  { expression: "忘れる", reading: "わすれる", meaning: "to forget", pl: "zapominać" },
  { expression: "私", reading: "わたし", meaning: "I, myself", pl: "ja" },
  { expression: "私", reading: "わたくし", meaning: "I (formal)", pl: "ja (oficjalnie)" },
  { expression: "渡す", reading: "わたす", meaning: "to hand over", pl: "wręczać, podawać" },
  { expression: "渡る", reading: "わたる", meaning: "to cross over", pl: "przechodzić (przez)" },
  { expression: "悪い", reading: "わるい", meaning: "bad, sinful", pl: "zły, niedobry" },
];

// ============================================================================
// CATEGORY ASSIGNMENT
// ============================================================================
const CATEGORIES = {
  zwroty: "Zwroty",
  ludzie: "Ludzie",
  cialo: "Ciało",
  jedzenie: "Jedzenie",
  miejsca: "Miejsca",
  czas: "Czas",
  przymiotniki: "Przymiotniki",
  czasowniki: "Czasowniki",
  rzeczowniki: "Rzeczowniki",
  inne: "Inne",
};

function assignCategory(word) {
  const m = (word.meaning + " " + word.pl).toLowerCase();
  const e = word.expression;
  const r = word.reading;

  // Zwroty
  if (/^(ああ|ええ|はい|いいえ|さあ|もう|もしもし|どうぞ|どうも|では|でも|しかし|また|まだ|ちょっと|すぐに|とても|もっと|よく|いつも|まっすぐ)$/.test(e) ||
      /^(じゃ|じゃあ|そう|そうです)/.test(r) ||
      /^(お～|～さん|下さい)$/.test(e) ||
      /^(こんな|そんな|どんな|あの|この|その|どの|あれ|これ|それ|どれ)$/.test(e) ||
      /^(ここ|そこ|あそこ|こちら|そちら|あちら|こっち|そっち|あっち|どこ|どちら|どっち|どなた)$/.test(e) ||
      /^(それから|それでは|そうして|そして)/.test(r) ||
      /halo|proszę.*zaproszenie|no dalej|tak$|nie.*wcale|więc|ale.*jednak|eee|jak\b.*grzeczn|dlaczego|kiedy$|gdzie$|który$|co$|kto$|ile\b|jaki\b/.test(m) && !m.includes("to ") && e.length <= 6) {
    // Only short expression-based greetings/particles
  }

  // Greetings & expressions
  const zwrotyExpr = ["ああ", "ええ", "はい", "いいえ", "さあ", "もしもし", "どうぞ", "どうも", "お～",
    "～さん", "下さい", "いかが", "どう", "どうして", "こんな", "そんな", "どんな"];
  const zwrotyReading = ["じゃ; じゃあ", "そう; そうです", "そうして; そして", "それから", "それでは"];
  if (zwrotyExpr.includes(e) || zwrotyReading.includes(r) ||
      ["あの", "この", "その", "どの"].includes(e) && !m.includes("osoba") ||
      ["あれ", "これ", "それ", "どれ"].includes(e) ||
      ["ここ", "そこ", "あそこ"].includes(e) ||
      ["こちら", "そちら", "あちら", "こっち", "そっち", "あっち", "どこ", "どちら", "どっち", "どなた"].includes(e) ||
      ["いつ", "いくつ", "いくら", "なぜ", "何", "誰", "誰か"].includes(e) ||
      ["もう", "もっと", "とても", "よく", "すぐに", "まだ", "また", "ちょっと", "まっすぐ",
       "いつも", "丁度", "多分", "段々", "ゆっくりと", "結構", "全部", "沢山"].includes(e) ||
      ["では", "でも", "しかし"].includes(e)) {
    return "zwroty";
  }

  // Ludzie
  if (/matka|ojciec|brat|siostr|babci|dziad|wujek|cioci|żona|rodzin|rodzeństwo|rodzic|dziecko|dorosły|chłopiec|dziewczyn|kobieta|mężczyzna|osoba|człowiek|student|uczeń|nauczyciel|profesor|lekarz|policjant|obcokrajow|pan\/pani|przyjaciel|wielu ludzi/.test(m)) {
    return "ludzie";
  }

  // Ciało
  if (/głowa|twarz|oko|oczy|ucho|nos|usta|ząb|ręka|dłoń|stopa|noga|brzuch|ciało|zdrowie|wzrost/.test(m) && !m.includes("robić") && !m.includes("jeść")) {
    return "cialo";
  }

  // Jedzenie
  if (/jedzenie|jeść|pić|śniadanie|obiad|kolacja|posiłek|ryż.*gotow|ryba|mięso|wołowina|wieprzowina|kurczak|jajko|owoc|warzywo|cukier|sól|masło|chleb|mleko|herbata|kawa|sake|alkohol|sos sojowy|curry|pyszny|smaczny|niesmaczny|słodki|ostry.*słon|cukierek|przekąska|słodycze|napój|woda$/.test(m)) {
    return "jedzenie";
  }

  // Miejsca
  if (/szkoła|uniwersytet|biblioteka|szpital|stacja|kino|kawiarnia|restauracja|hotel|poczta|bank|sklep|warzywniak|dom towarowy|ambasada|park\b|skrzyżowanie|posterunek|stołówka|basen|wejście.*dom|ogród|kuchnia|pokój|toaleta|łazienka|korytarz|budynek/.test(m)) {
    return "miejsca";
  }

  // Czas
  if (/rano|jutro|wczoraj|dzisiaj|teraz|pojutrze|przedwczoraj|wiosna|lato|jesień|zima|poniedziałek|wtorek|środa|czwartek|piątek|sobota|niedziela|miesiąc|tydzień|rok|popołudnie|przedpołudnie|wieczór|noc|południe.*dzień|codziennie|co tydzień|co miesiąc|co roku|co wieczór|każdego ranka|dziś rano|dziś wieczorem|ten rok|ten miesiąc|ten tydzień|zeszły|przyszły|dwa lata temu|za dwa lata|wakacje|wolne.*dzień|następny|początek|po raz pierwszy|czas$|godzina|minut|dni;|dzień$|~ lat$|~ godzin|~ tygodni|~ miesięcy/.test(m) ||
      /^(朝|昼|夜|夕方|今|昨日|明日|今日|秋|春|夏|冬|午前|午後|晩|先月|先週|去年|来月|来週|来年|今月|今週|今晩|今朝|一昨日|明後日|おととし|さ来年|毎朝|毎日|毎週|毎月|毎年|毎晩|次|時々)$/.test(e) ||
      /^(～時|～日|～月|～年|～か月|～週間|～時間|～分|～歳|半|半分|一日|～ころ; ～ごろ)$/.test(e)) {
    return "czas";
  }

  // Przymiotniki
  if (/^(青い|赤い|明るい|新しい|暑い|熱い|厚い|暖かい|危ない|甘い|美味しい|多い|大きい|大きな|重い|面白い|遅い|忙しい|痛い|薄い|うるさい|汚い|嫌|嫌い|大丈夫|大好き|大切|大変|高い|楽しい|小さい|小さな|近い|違う|冷たい|強い|つまらない|長い|難しい|低い|広い|古い|太い|細い|短い|丸い; 円い|まずい|暗い|元気|綺麗|静か|上手|丈夫|下手|便利|有名|にぎやか|りっぱ|色々|同じ|狭い|寒い|涼しい|好き|少ない|弱い|軽い|可愛い|悪い|若い|早い|速い|遠い|欲しい|いい; よい|温い|本当)$/.test(e)) {
    return "przymiotniki";
  }

  // Czasowniki
  if (/^(to |robić|pić|jeść|iść|móc|widzieć|patrzeć|słuchać|pisać|czytać|mówić|rozmawiać|uczyć|kupować|sprzedawać|wracać|otwierać|zamykać|włączać|wyłączać|kasować|wchodzić|wychodzić|biegać|pływać|latać|skakać|wspinać|chodzić|spacerować|siadać|siedzieć|stać|wstawać|czekać|spotk|urodzić|umierać|mieszkać|pracować|odpoczywać|zapominać|rozumieć|zapamiętać|potrzebować|prosić|nosić|trzymać|pokazywać|odpowiadać|stawać się|znikać|kwitnąć|wiać|padać|zachmurzać|naklejać|myć|prać|śpiewać|grać|brać|ciągnąć|pchać|wieszać|ubierać|zakładać|nakładać|zdejmować|wiązać|dzwonić|kopiować|ciąć|robić.*zdjęcie|wręczać|podawać|przechodzić|skręcać|ustawiać|wkładać|wyjmować|oddawać|zwracać|pożyczać|męczyć|zgubić|zabierać|kończyć|zaczynać|zatrzymać|wysiad|wsiadać|przybywać|docierać)/.test(m) ||
      /する$|く$|ぐ$|す$|む$|ぬ$|ぶ$|つ$|う$|る$/.test(r) && m.includes("ć") && !["色", "声", "鍵"].includes(e)) {
    if (["会う","開く","開ける","上げる","遊ぶ","浴びる","洗う","在る","有る","歩く","言う","行く","居る","要る","入れる","歌う","生まれる","売る","起きる","置く","教える","押す","覚える","泳ぐ","降りる","終る","買う","返す","帰る","かかる","掛ける","かける","書く","貸す","借りる","かぶる","消える","聞く","切る","着る","来る","消す","困る","コピーする","咲く","差す","座る","知る","閉まる","閉める","締める","吸う","住む","する","立つ","頼む","食べる","使う","疲れる","着く","作る","つける","勤める","出かける","できる","出す","出る","止まる","取る","撮る","飛ぶ","鳴く","無くす","なる","習う","並ぶ","並べる","脱ぐ","寝る","登る","飲む","乗る","入る","はく","始まる","走る","働く","話す","貼る","晴れる","引く","弾く","吹く","降る","曲る","磨く","見せる","見る","持つ","やる","呼ぶ","読む","分かる","忘れる","渡す","渡る","答える","曇る","死ぬ"].includes(e)) {
      return "czasowniki";
    }
  }

  // Counters / suffixes -> inne
  if (/^～/.test(e) || /licznik|przyrostek|prefiks/.test(m)) {
    return "inne";
  }

  // Rzeczowniki — catch remaining nouns
  const nounKeywords = /parasol|torba|klucz|zamek|papier|aparat|kalendarz|portfel|biurko|okno|stół|krzesło|łóżko|zeszyt|książka|gazeta|magazyn|czasopismo|słownik|zdjęcie|list|obraz|rysunek|piosenka|muzyka|film|telewizja|radio|telefon|zegarek|zegar|samochód|rower|autobus|taksówka|samolot|pociąg|winda|grzejnik|prysznic|kąpiel|wanna|pranie|sprzątanie|zakupy|praca|lekcja|zadanie|pytanie|problem|podróż|wycieczka|impreza|spacer|nauka|ćwiczenie|gotowanie|małżeństwo|urodziny|wiadomości|pogoda|deszcz|śnieg|wiatr|niebo|morze|plaża|rzeka|góra|wieś|miasto|droga|ulica|most|brama|drzwi|kurtka|marynarka|spodnie|spódnica|koszula|sweter|garnitur|czapka|kapelusz|buty|skarpetki|okulary|krawat|chusteczka|guzik|kieszeń|pudełko|koperta|taśma|magnetofon|strona|bilet|znaczki|pocztówka|pałeczki|widelec|łyżka|nóż|filiżanka|szklanka|talerz|popielniczka|wazon|miseczka|zapałka|mydło|lekarstwo|przeziębienie|choroba|pieniądze|kolor|drzewo|kwiat|ptak|pies|kot|zwierzę|zwierzak|bagaż|ubranie|głos|mapa|miejsce|okolica|rzecz|przedmiot|imię|znaczenie|słowa|język|wypracowanie|zdanie|tekst|kanji|katakana|hiragana|klasa|sport|gitara|wolny czas|fotografia|płyta|lodówka|półka|wieczne pióro|długopis|popielniczka|róg|north|wschód|zachód|południe.*kierunek|północ|lewa|prawa|bok|wewnątrz|na zewnątrz|nad|pod|obok|blisko|przed|za|tył|środek|daleki|bliski|w pobliżu|po drugiej|jen|gram\b|metr\b|kilogram|kilometr|zero|sto|tysiąc|dziesięć tysięcy/;

  if (nounKeywords.test(m)) {
    return "rzeczowniki";
  }

  // Direction/position words -> rzeczowniki
  if (["上", "下", "中", "前", "後ろ", "右", "左", "横", "隣", "外", "外", "北", "南", "東", "西", "向こう", "近く", "所", "辺", "先"].includes(e)) {
    return "rzeczowniki";
  }

  // Numbers -> inne
  if (/^(一|二|三|四|五|六|七|八|九|十|百|千|万|ゼロ|零)$/.test(e)) {
    return "inne";
  }

  // Counters/counting words -> inne
  if (/^(一つ|二つ|三つ|四つ|五つ|六つ|七つ|八つ|九つ|一人|二人|二十歳|一日|二日|三日|四日|五日|六日|七日|八日|九日|十日|二十日)$/.test(e)) {
    return "inne";
  }

  // Remaining adjectives/descriptors
  if (/^(余り|大勢|少し|～すぎ|～ずつ|～くらい; ぐらい|～だけ|～がる|～たち|～側|何～|～中|たて)$/.test(e)) {
    return "inne";
  }

  // Catch verbs we missed
  if (m.includes("ć") && /する|く$|ぐ$|す$|む$|ぬ$|ぶ$|つ$|う$|る$|ける$|べる$|せる$|れる$/.test(r)) {
    return "czasowniki";
  }

  // If nothing matched, categorize as inne
  return "inne";
}

// Add category to each word
const CATEGORIZED_VOCAB = VOCAB_DATA.map((w) => ({
  ...w,
  category: assignCategory(w),
}));

// ============================================================================
// STORAGE HELPERS (window.storage API)
// ============================================================================
const STORAGE_KEY = "jlpt-n5-progress";

const defaultProgress = () => ({
  words: {},
  streak: { current: 0, lastDate: null },
  totalQuizzes: 0,
});

async function loadProgress() {
  try {
    const data = await window.storage.get(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    // ignore
  }
  return defaultProgress();
}

async function saveProgress(progress) {
  try {
    await window.storage.set(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    // ignore
  }
}

// ============================================================================
// QUIZ LOGIC HELPERS
// ============================================================================
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function weightedRandom(items, weightFn) {
  const weights = items.map(weightFn);
  const total = weights.reduce((s, w) => s + w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

function selectQuestions(vocab, count, progress) {
  const selected = [];
  const pool = [...vocab];
  for (let i = 0; i < Math.min(count, pool.length); i++) {
    const word = weightedRandom(pool, (w) => {
      const p = progress.words[w.expression];
      if (!p) return 2; // new word: 2x priority
      const pct = p.total > 0 ? p.correct / p.total : 0;
      if (pct < 0.6) return 3; // low accuracy: 3x
      return 1;
    });
    selected.push(word);
    pool.splice(pool.indexOf(word), 1);
  }
  return selected;
}

function generateOptions(correctWord, allInCategory, mode) {
  const options = [correctWord];
  const pool = allInCategory.filter(
    (w) => w.expression !== correctWord.expression
  );
  const shuffled = shuffleArray(pool);
  for (const w of shuffled) {
    if (options.length >= 4) break;
    // Avoid duplicate display values
    const getVal = (word) => {
      if (mode === "jp-pl") return word.pl;
      if (mode === "pl-jp") return word.expression;
      if (mode === "reading") return word.pl;
      return word.pl;
    };
    if (!options.some((o) => getVal(o) === getVal(w))) {
      options.push(w);
    }
  }
  // Only use same-category words for distractors
  return shuffleArray(options);
}

// ============================================================================
// STREAK
// ============================================================================
function updateStreak(streak) {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (streak.lastDate === today) {
    return streak; // already done today
  }
  if (streak.lastDate === yesterday) {
    return { current: streak.current + 1, lastDate: today };
  }
  return { current: 1, lastDate: today };
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
// ============================================================================
// SHARED STYLES
// ============================================================================
const SHELL = {
  minHeight: "100vh",
  background: "var(--color-background-primary, #fafaf8)",
  color: "var(--color-text-primary, #1a1a2e)",
  fontFamily: "system-ui, -apple-system, sans-serif",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
};

const CONTAINER = {
  width: "100%",
  maxWidth: "500px",
  margin: "0 auto",
  padding: "0 1rem",
  boxSizing: "border-box",
};

const BTN_BASE = {
  padding: "0.875rem 1rem",
  fontSize: "1rem",
  fontWeight: 600,
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  userSelect: "none",
  WebkitTapHighlightColor: "transparent",
  minHeight: "48px",
  boxSizing: "border-box",
};

const BTN_PRIMARY = { ...BTN_BASE, background: "#1a1a2e", color: "#fff" };
const BTN_OUTLINE = { ...BTN_BASE, background: "transparent", color: "#1a1a2e", border: "2px solid #ddd" };

// ============================================================================
// NAV BAR COMPONENT
// ============================================================================
function NavBar({ title, onBack, right }) {
  return (
    <div style={{
      position: "sticky",
      top: 0,
      zIndex: 10,
      background: "var(--color-background-primary, #fafaf8)",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
      padding: "0 1rem",
      height: "52px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      userSelect: "none",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              background: "none", border: "none", cursor: "pointer", fontSize: "1.25rem",
              padding: "4px 8px", borderRadius: "8px", lineHeight: 1,
              color: "var(--color-text-primary, #1a1a2e)", WebkitTapHighlightColor: "transparent",
            }}
            aria-label="Wróć"
          >
            ←
          </button>
        )}
        <span style={{ fontWeight: 700, fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {title}
        </span>
      </div>
      {right && <div style={{ fontSize: "0.85rem", opacity: 0.5, flexShrink: 0 }}>{right}</div>}
    </div>
  );
}

// ============================================================================
// BOTTOM TAB BAR COMPONENT
// ============================================================================
function TabBar({ active, onNavigate }) {
  const tabs = [
    { id: "home", label: "Quiz", icon: "▶" },
    { id: "progress", label: "Postępy", icon: "◉" },
    { id: "settings", label: "Ustawienia", icon: "⚙" },
  ];
  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      background: "var(--color-background-primary, #fafaf8)",
      borderTop: "1px solid rgba(0,0,0,0.08)",
      display: "flex",
      justifyContent: "space-around",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
      userSelect: "none",
    }}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onNavigate(t.id)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px",
            padding: "10px 0 8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: active === t.id ? "#1a1a2e" : "rgba(26,26,46,0.4)",
            fontWeight: active === t.id ? 700 : 500,
            fontSize: "0.7rem",
            minHeight: "48px",
            WebkitTapHighlightColor: "transparent",
            transition: "color 0.15s",
          }}
        >
          <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>{t.icon}</span>
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ============================================================================
// SCREEN FADE WRAPPER
// ============================================================================
function ScreenFade({ children, screenKey }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, [screenKey]);
  return (
    <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.15s ease" }}>
      {children}
    </div>
  );
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
export default function App() {
  const [screen, setScreen] = useState("home"); // home, settings, quiz, summary, progress
  const [progress, setProgress] = useState(defaultProgress());
  const [loaded, setLoaded] = useState(false);

  // Quiz settings
  const [mode, setMode] = useState("jp-pl");
  const [selectedCategories, setSelectedCategories] = useState(
    Object.keys(CATEGORIES)
  );
  const [questionCount, setQuestionCount] = useState(10);

  // Quiz state
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [fadeIn, setFadeIn] = useState(true);
  const [reviewMode, setReviewMode] = useState(false);

  // Load progress on mount
  useEffect(() => {
    loadProgress().then((p) => {
      setProgress(p);
      setLoaded(true);
    });
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    if (loaded) saveProgress(progress);
  }, [progress, loaded]);

  // Compute stats
  const stats = useMemo(() => {
    const w = progress.words;
    const entries = Object.values(w);
    const totalAnswered = entries.reduce((s, e) => s + e.total, 0);
    const totalCorrect = entries.reduce((s, e) => s + e.correct, 0);
    const pct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
    const seen = entries.length;
    return { totalAnswered, totalCorrect, pct, seen, streak: progress.streak.current };
  }, [progress]);

  // Words with < 60% accuracy for review
  const weakWords = useMemo(() => {
    return CATEGORIZED_VOCAB.filter((w) => {
      const p = progress.words[w.expression];
      return p && p.total >= 2 && p.correct / p.total < 0.6;
    });
  }, [progress]);

  // Category stats for progress screen
  const categoryStats = useMemo(() => {
    return Object.entries(CATEGORIES).map(([key, label]) => {
      const catWords = CATEGORIZED_VOCAB.filter((w) => w.category === key);
      const seen = catWords.filter((w) => progress.words[w.expression]).length;
      const answered = catWords.reduce((s, w) => s + (progress.words[w.expression]?.total || 0), 0);
      const correct = catWords.reduce((s, w) => s + (progress.words[w.expression]?.correct || 0), 0);
      const pct = answered > 0 ? Math.round((correct / answered) * 100) : 0;
      return { key, label, total: catWords.length, seen, pct };
    });
  }, [progress]);

  // Top weak words for progress screen
  const topWeakWords = useMemo(() => {
    return CATEGORIZED_VOCAB
      .filter((w) => {
        const p = progress.words[w.expression];
        return p && p.total >= 1;
      })
      .map((w) => {
        const p = progress.words[w.expression];
        return { ...w, pct: Math.round((p.correct / p.total) * 100), total: p.total };
      })
      .sort((a, b) => a.pct - b.pct)
      .slice(0, 15);
  }, [progress]);

  // Start quiz
  const startQuiz = useCallback(
    (review = false) => {
      setReviewMode(review);
      const pool = review
        ? weakWords
        : CATEGORIZED_VOCAB.filter((w) => selectedCategories.includes(w.category));
      if (pool.length === 0) return;
      const qs = selectQuestions(pool, review ? Math.min(20, pool.length) : questionCount, progress);
      setQuestions(qs);
      setCurrentQ(0);
      setSelected(null);
      setResults([]);
      setFadeIn(true);

      const catWords = CATEGORIZED_VOCAB.filter((w) => w.category === qs[0].category);
      setOptions(generateOptions(qs[0], catWords, mode));

      setScreen("quiz");
    },
    [selectedCategories, questionCount, progress, mode, weakWords]
  );

  // Handle answer
  const handleAnswer = useCallback(
    (optionWord) => {
      if (selected !== null) return;
      const correct = optionWord.expression === questions[currentQ].expression;
      setSelected(optionWord.expression);
      setResults((prev) => [
        ...prev,
        { word: questions[currentQ], correct, chosen: optionWord },
      ]);

      setProgress((prev) => {
        const expr = questions[currentQ].expression;
        const existing = prev.words[expr] || { correct: 0, total: 0, lastSeen: 0 };
        return {
          ...prev,
          words: {
            ...prev.words,
            [expr]: {
              correct: existing.correct + (correct ? 1 : 0),
              total: existing.total + 1,
              lastSeen: Date.now(),
            },
          },
        };
      });

      const delay = correct ? 1500 : 3000;
      setTimeout(() => {
        if (currentQ + 1 < questions.length) {
          setFadeIn(false);
          setTimeout(() => {
            const nextIdx = currentQ + 1;
            setCurrentQ(nextIdx);
            setSelected(null);
            const catWords = CATEGORIZED_VOCAB.filter(
              (w) => w.category === questions[nextIdx].category
            );
            setOptions(generateOptions(questions[nextIdx], catWords, mode));
            setFadeIn(true);
          }, 200);
        } else {
          setProgress((prev) => ({
            ...prev,
            streak: updateStreak(prev.streak),
            totalQuizzes: prev.totalQuizzes + 1,
          }));
          setScreen("summary");
        }
      }, delay);
    },
    [selected, questions, currentQ, mode]
  );

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const showTabs = ["home", "progress", "settings"].includes(screen);

  if (!loaded) {
    return (
      <div style={{ ...SHELL, justifyContent: "center", alignItems: "center" }}>
        <p style={{ fontSize: "1.25rem", opacity: 0.5 }}>Ładowanie...</p>
      </div>
    );
  }

  // =========== HOME SCREEN ===========
  if (screen === "home") {
    return (
      <div style={SHELL}>
        <NavBar title="日本語クイズ" right="JLPT N5" />
        <ScreenFade screenKey="home">
          <div style={{ ...CONTAINER, paddingTop: "1.5rem", paddingBottom: "6rem" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}>
              {[
                { label: "Przerobione", value: stats.seen, sub: `/ ${VOCAB_DATA.length}` },
                { label: "Poprawność", value: `${stats.pct}%`, sub: "" },
                { label: "Seria", value: stats.streak, sub: "dni" },
              ].map((s) => (
                <div key={s.label} style={{
                  background: "var(--color-background-secondary, #fff)",
                  borderRadius: "12px",
                  padding: "0.875rem 0.5rem",
                  textAlign: "center",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                }}>
                  <div style={{ fontSize: "1.4rem", fontWeight: 700 }}>{s.value}</div>
                  <div style={{ fontSize: "0.65rem", opacity: 0.5 }}>{s.sub}</div>
                  <div style={{ fontSize: "0.7rem", opacity: 0.6, marginTop: "0.2rem" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button
                onClick={() => setScreen("settings")}
                style={BTN_PRIMARY}
              >
                Rozpocznij quiz
              </button>

              {weakWords.length > 0 && (
                <button
                  onClick={() => {
                    setReviewMode(true);
                    setScreen("settings");
                  }}
                  style={{ ...BTN_OUTLINE, color: "#c0392b", borderColor: "#c0392b" }}
                >
                  Powtórka błędów ({weakWords.length} słów)
                </button>
              )}
            </div>

            <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.75rem", opacity: 0.35 }}>
              {VOCAB_DATA.length} słów JLPT N5
            </p>
          </div>
        </ScreenFade>
        <TabBar active="home" onNavigate={setScreen} />
      </div>
    );
  }

  // =========== PROGRESS SCREEN ===========
  if (screen === "progress") {
    return (
      <div style={SHELL}>
        <NavBar title="Postępy" />
        <ScreenFade screenKey="progress">
          <div style={{ ...CONTAINER, paddingTop: "1.5rem", paddingBottom: "6rem" }}>
            {/* Overview stats */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}>
              {[
                { label: "Słowa poznane", value: `${stats.seen} / ${VOCAB_DATA.length}` },
                { label: "Poprawność", value: `${stats.pct}%` },
                { label: "Quizy ukończone", value: progress.totalQuizzes },
                { label: "Seria dni", value: `${stats.streak} dni` },
              ].map((s) => (
                <div key={s.label} style={{
                  background: "var(--color-background-secondary, #fff)",
                  borderRadius: "12px",
                  padding: "0.875rem",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                }}>
                  <div style={{ fontSize: "1.25rem", fontWeight: 700 }}>{s.value}</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.5, marginTop: "0.15rem" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Category breakdown */}
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.75rem", opacity: 0.7 }}>
              Kategorie
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {categoryStats.map((c) => (
                <div key={c.key} style={{
                  background: "var(--color-background-secondary, #fff)",
                  borderRadius: "10px",
                  padding: "0.75rem",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                    <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>{c.label}</span>
                    <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>
                      {c.seen}/{c.total} {c.pct > 0 ? `· ${c.pct}%` : ""}
                    </span>
                  </div>
                  <div style={{
                    width: "100%",
                    height: "4px",
                    background: "#e8e8e8",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${(c.seen / c.total) * 100}%`,
                      background: c.pct >= 80 ? "#27ae60" : c.pct >= 50 ? "#f39c12" : "#1a1a2e",
                      borderRadius: "2px",
                      transition: "width 0.3s",
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Weakest words */}
            {topWeakWords.length > 0 && (
              <>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.75rem", opacity: 0.7 }}>
                  Najtrudniejsze słowa
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {topWeakWords.map((w, i) => (
                    <div key={i} style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.6rem 0.75rem",
                      background: "var(--color-background-secondary, #fff)",
                      borderRadius: "8px",
                      borderLeft: `3px solid ${w.pct >= 60 ? "#f39c12" : "#c0392b"}`,
                    }}>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>{w.expression}</span>
                        <span style={{ opacity: 0.4, fontSize: "0.8rem", marginLeft: "0.5rem" }}>{w.reading}</span>
                        <div style={{ fontSize: "0.8rem", opacity: 0.6, marginTop: "0.1rem" }}>{w.pl}</div>
                      </div>
                      <span style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: w.pct >= 60 ? "#f39c12" : "#c0392b",
                        flexShrink: 0,
                        marginLeft: "0.5rem",
                      }}>
                        {w.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {stats.seen === 0 && (
              <div style={{ textAlign: "center", padding: "2rem 0", opacity: 0.4 }}>
                <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>まだ</p>
                <p style={{ fontSize: "0.9rem" }}>Brak danych. Rozpocznij quiz!</p>
              </div>
            )}
          </div>
        </ScreenFade>
        <TabBar active="progress" onNavigate={setScreen} />
      </div>
    );
  }

  // =========== SETTINGS SCREEN ===========
  if (screen === "settings") {
    const catCounts = {};
    for (const cat of Object.keys(CATEGORIES)) {
      catCounts[cat] = CATEGORIZED_VOCAB.filter((w) => w.category === cat).length;
    }

    return (
      <div style={SHELL}>
        <NavBar
          title={reviewMode ? "Powtórka błędów" : "Ustawienia quizu"}
          onBack={() => { setScreen("home"); setReviewMode(false); }}
        />
        <ScreenFade screenKey="settings">
          <div style={{ ...CONTAINER, paddingTop: "1.25rem", paddingBottom: showTabs ? "6rem" : "2rem" }}>
            {/* Mode selection */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: "0.5rem" }}>
                Tryb
              </label>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {[
                  { value: "jp-pl", label: "JP → PL" },
                  { value: "pl-jp", label: "PL → JP" },
                  { value: "reading", label: "Czytanie" },
                ].map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setMode(m.value)}
                    style={{
                      padding: "0.6rem 1rem",
                      borderRadius: "8px",
                      border: mode === m.value ? "2px solid #1a1a2e" : "2px solid #ddd",
                      background: mode === m.value ? "#1a1a2e" : "transparent",
                      color: mode === m.value ? "#fff" : "inherit",
                      cursor: "pointer",
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      minHeight: "44px",
                      userSelect: "none",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            {!reviewMode && (
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: "0.5rem" }}>
                  Kategorie
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {Object.entries(CATEGORIES).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => toggleCategory(key)}
                      style={{
                        padding: "0.5rem 0.75rem",
                        borderRadius: "20px",
                        border: selectedCategories.includes(key) ? "2px solid #1a1a2e" : "2px solid #ddd",
                        background: selectedCategories.includes(key) ? "#1a1a2e" : "transparent",
                        color: selectedCategories.includes(key) ? "#fff" : "inherit",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        minHeight: "36px",
                        userSelect: "none",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {label} ({catCounts[key]})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question count */}
            {!reviewMode && (
              <div style={{ marginBottom: "1.75rem" }}>
                <label style={{ fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: "0.5rem" }}>
                  Liczba pytań
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {[10, 20, 50].map((n) => (
                    <button
                      key={n}
                      onClick={() => setQuestionCount(n)}
                      style={{
                        padding: "0.6rem 1.25rem",
                        borderRadius: "8px",
                        border: questionCount === n ? "2px solid #1a1a2e" : "2px solid #ddd",
                        background: questionCount === n ? "#1a1a2e" : "transparent",
                        color: questionCount === n ? "#fff" : "inherit",
                        cursor: "pointer",
                        fontWeight: 600,
                        minHeight: "44px",
                        userSelect: "none",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => startQuiz(reviewMode)}
              disabled={!reviewMode && selectedCategories.length === 0}
              style={{
                ...BTN_PRIMARY,
                width: "100%",
                opacity: (!reviewMode && selectedCategories.length === 0) ? 0.4 : 1,
                cursor: (!reviewMode && selectedCategories.length === 0) ? "default" : "pointer",
              }}
            >
              Start
            </button>
          </div>
        </ScreenFade>
        <TabBar active="settings" onNavigate={(s) => { setReviewMode(false); setScreen(s); }} />
      </div>
    );
  }

  // =========== QUIZ SCREEN ===========
  if (screen === "quiz" && questions.length > 0) {
    const q = questions[currentQ];
    const progressPct = ((currentQ + (selected ? 1 : 0)) / questions.length) * 100;
    const isCorrect = selected === q.expression;
    const showCard = selected && !isCorrect;

    return (
      <div style={SHELL}>
        <NavBar
          title={`Quiz ${currentQ + 1}/${questions.length}`}
          onBack={() => { setScreen("home"); setReviewMode(false); }}
          right={CATEGORIES[q.category]}
        />
        {/* Progress bar under nav */}
        <div style={{ width: "100%", height: "3px", background: "#e0e0e0" }}>
          <div style={{
            height: "100%",
            width: `${progressPct}%`,
            background: "#1a1a2e",
            transition: "width 0.3s ease",
          }} />
        </div>

        <div style={{ ...CONTAINER, paddingTop: "1.5rem", paddingBottom: "2rem", flex: 1 }}>
          {/* Question */}
          <div style={{
            textAlign: "center",
            marginBottom: "2rem",
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}>
            {mode === "jp-pl" && (
              <>
                <div style={{ fontSize: "3rem", fontWeight: 700, lineHeight: 1.2 }}>
                  {q.expression}
                </div>
                <div style={{ fontSize: "1.1rem", opacity: 0.5, marginTop: "0.5rem" }}>
                  {q.reading}
                </div>
              </>
            )}
            {mode === "pl-jp" && (
              <div style={{ fontSize: "1.75rem", fontWeight: 600, padding: "0.5rem 0" }}>
                {q.pl}
              </div>
            )}
            {mode === "reading" && (
              <div style={{ fontSize: "3rem", fontWeight: 700 }}>
                {q.reading}
              </div>
            )}
          </div>

          {/* Options */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}>
            {options.map((opt, i) => {
              let bg = "var(--color-background-secondary, #fff)";
              let border = "2px solid #e0e0e0";
              let textColor = "inherit";

              if (selected) {
                if (opt.expression === q.expression) {
                  bg = "#27ae60";
                  border = "2px solid #27ae60";
                  textColor = "#fff";
                } else if (opt.expression === selected) {
                  bg = "#c0392b";
                  border = "2px solid #c0392b";
                  textColor = "#fff";
                }
              }

              const displayValue =
                mode === "jp-pl" ? opt.pl :
                mode === "pl-jp" ? null :
                opt.pl;

              return (
                <button
                  key={`${opt.expression}-${i}`}
                  onClick={() => handleAnswer(opt)}
                  disabled={selected !== null}
                  style={{
                    padding: "0.875rem 1rem",
                    fontSize: mode === "pl-jp" ? "1.2rem" : "1rem",
                    fontWeight: 500,
                    background: bg,
                    color: textColor,
                    border,
                    borderRadius: "12px",
                    cursor: selected ? "default" : "pointer",
                    textAlign: "left",
                    transition: "background 0.2s, border 0.2s",
                    minHeight: "48px",
                    userSelect: "none",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {mode === "pl-jp" ? (
                    <span style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                      <span>{opt.expression}</span>
                      {opt.expression !== opt.reading && (
                        <span style={{ fontSize: "0.8rem", opacity: selected ? 0.7 : 0.45, fontWeight: 400 }}>
                          {opt.reading}
                        </span>
                      )}
                    </span>
                  ) : displayValue}
                </button>
              );
            })}
          </div>

          {/* Wrong answer card */}
          {showCard && (
            <div style={{
              marginTop: "1.25rem",
              padding: "1rem",
              background: "rgba(192,57,43,0.08)",
              borderRadius: "12px",
              textAlign: "center",
              border: "1px solid rgba(192,57,43,0.2)",
            }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{q.expression}</div>
              <div style={{ fontSize: "0.95rem", opacity: 0.6 }}>{q.reading}</div>
              <div style={{ fontSize: "1rem", fontWeight: 600, marginTop: "0.5rem" }}>{q.pl}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========== SUMMARY SCREEN ===========
  if (screen === "summary") {
    const correct = results.filter((r) => r.correct).length;
    const total = results.length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const errors = results.filter((r) => !r.correct);

    return (
      <div style={SHELL}>
        <NavBar title="Wynik" onBack={() => { setScreen("home"); setReviewMode(false); }} />
        <ScreenFade screenKey="summary">
          <div style={{ ...CONTAINER, paddingTop: "1.5rem", paddingBottom: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ fontSize: "3rem", fontWeight: 800 }}>
                {correct} / {total}
              </div>
              <div style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: pct >= 80 ? "#27ae60" : pct >= 50 ? "#f39c12" : "#c0392b",
              }}>
                {pct}%
              </div>
              {pct === 100 && <div style={{ fontSize: "1.1rem", marginTop: "0.5rem" }}>Doskonale!</div>}
            </div>

            {errors.length > 0 && (
              <div style={{ marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.75rem", opacity: 0.7 }}>
                  Błędy ({errors.length})
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {errors.map((err, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "0.75rem 1rem",
                        background: "rgba(192,57,43,0.06)",
                        borderRadius: "10px",
                        borderLeft: "3px solid #c0392b",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                          {err.word.expression}
                        </span>
                        <span style={{ fontSize: "0.8rem", opacity: 0.5 }}>
                          {err.word.reading}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 500, marginTop: "0.2rem" }}>
                        {err.word.pl}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button onClick={() => startQuiz(reviewMode)} style={BTN_PRIMARY}>
                Jeszcze raz
              </button>
              <button onClick={() => { setScreen("home"); setReviewMode(false); }} style={BTN_OUTLINE}>
                Menu główne
              </button>
            </div>
          </div>
        </ScreenFade>
      </div>
    );
  }

  return null;
}

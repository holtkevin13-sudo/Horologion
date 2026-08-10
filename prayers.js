/* ============================================================
   HOROLOGION — prayer texts
   Traditional English, in the order received across the Orthodox Church.
   Rubrics are marked R(), prayers P(), psalm verses V(), headings H().
   Editing a prayer here changes it everywhere it appears.
   ============================================================ */

/* ---- shorthand block builders ---- */
function R(t){ return {t:'r', c:t}; }            // rubric (red instruction)
function P(t, times){ return {t:'p', c:t, x:times||''}; }  // prayer text
function V(t){ return {t:'v', c:t}; }            // psalm verse / antiphon
function H(t){ return {t:'h', c:t}; }            // sub-heading

/* ---- shared building blocks ---- */
var BEGINNING = [
  R('Rising from sleep, before any other thing, stand reverently and make the sign of the Cross, saying:'),
  P('In the name of the Father, and of the Son, and of the Holy Spirit. Amen.'),
  R('Then pause a little, until all your senses are stilled and your thoughts forsake all things earthly. Then say:'),
  P('O Lord, cleanse me a sinner, for I have never done anything good in Thy sight; but deliver me from the evil one, and let Thy will be done in me, that I may open mine unworthy mouth without condemnation and praise Thy holy name: of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto the ages of ages. Amen.'),
  P('Glory to Thee, our God, glory to Thee.')
];

var TRISAGION = [
  H('The Trisagion Prayers'),
  P('O Heavenly King, Comforter, Spirit of Truth, Who art everywhere present and fillest all things, Treasury of good things and Giver of life: come and abide in us, and cleanse us from every impurity, and save our souls, O Good One.'),
  P('Holy God, Holy Mighty, Holy Immortal, have mercy on us.', 'Thrice'),
  P('Glory to the Father, and to the Son, and to the Holy Spirit, both now and ever, and unto the ages of ages. Amen.'),
  P('O Most Holy Trinity, have mercy on us. O Lord, blot out our sins. O Master, pardon our iniquities. O Holy One, visit and heal our infirmities, for Thy name\u2019s sake.'),
  P('Lord, have mercy.', 'Thrice'),
  P('Glory to the Father, and to the Son, and to the Holy Spirit, both now and ever, and unto the ages of ages. Amen.'),
  P('Our Father, Who art in the heavens, hallowed be Thy name. Thy kingdom come. Thy will be done, on earth as it is in heaven. Give us this day our daily bread, and forgive us our debts, as we forgive our debtors. And lead us not into temptation, but deliver us from the evil one.'),
  P('Lord, have mercy.', 'Twelve times'),
  P('Glory to the Father, and to the Son, and to the Holy Spirit, both now and ever, and unto the ages of ages. Amen.'),
  P('O come, let us worship God our King. O come, let us worship and fall down before Christ our King and God. O come, let us worship and fall down before Christ Himself, our King and our God.')
];

var THOU_WHO_AT_ALL_TIMES = P('O Thou Who at all times and at every hour, both in heaven and on earth, art worshipped and glorified, O Christ God, long-suffering, plenteous in mercy and compassion, Who lovest the righteous and hast mercy on sinners, Who callest all to salvation through the promise of good things to come: do Thou Thyself, O Lord, receive our prayers at this hour, and guide our life toward Thy commandments. Sanctify our souls, make chaste our bodies, correct our thoughts, purify our intentions, and deliver us from every sorrow, evil and distress. Compass us about with Thy holy angels, that guarded and guided by their host we may attain to the unity of the faith and to the knowledge of Thine unapproachable glory; for blessed art Thou unto the ages of ages. Amen.');

var MORE_HONORABLE = P('More honorable than the Cherubim, and beyond compare more glorious than the Seraphim, who without corruption gavest birth to God the Word, the very Theotokos, thee do we magnify.');

var HOUR_ENDING = [
  P('Lord, have mercy.', 'Forty times'),
  THOU_WHO_AT_ALL_TIMES,
  P('Lord, have mercy.', 'Thrice'),
  P('Glory to the Father, and to the Son, and to the Holy Spirit, both now and ever, and unto the ages of ages. Amen.'),
  MORE_HONORABLE,
  P('In the name of the Lord, father, bless.'),
  R('If praying alone, say:'),
  P('Through the prayers of our holy fathers, O Lord Jesus Christ our God, have mercy on us. Amen.')
];

/* ============================================================
   THE PRAYERS
   ============================================================ */
var PRAYERS = {

/* ---------------- MIDNIGHT ---------------- */
midnight: [
  { id:'mid-office', title:'The Midnight Office', by:'Kept by monastics through the night watch; abridged here for private use',
    body: [].concat(BEGINNING, TRISAGION, [
      H('Psalm 50'),
      V('Have mercy on me, O God, according to Thy great mercy; and according to the multitude of Thy compassions blot out my transgression. Wash me thoroughly from mine iniquity, and cleanse me from my sin. For I know mine iniquity, and my sin is ever before me. Against Thee only have I sinned and done this evil before Thee, that Thou mightest be justified in Thy words, and prevail when Thou art judged.'),
      V('Create in me a clean heart, O God, and renew a right spirit within me. Cast me not away from Thy presence, and take not Thy Holy Spirit from me. Restore unto me the joy of Thy salvation, and with Thy governing Spirit establish me. A sacrifice unto God is a broken spirit; a heart that is broken and humbled God will not despise.'),
      H('Troparia of the Midnight Hour'),
      P('Behold, the Bridegroom cometh at midnight, and blessed is the servant whom He shall find watching; but unworthy is he whom He shall find heedless. Beware, therefore, O my soul, and be not weighed down with sleep, lest thou be given over to death and shut out from the Kingdom. But rouse thyself and cry: Holy, holy, holy art Thou, O God; through the Theotokos have mercy on us.'),
      P('Meditating on that fearful day, O my soul, be watchful, and kindle thy lamp, filling it with oil; for thou knowest not when the voice shall come that saith unto thee: Behold, the Bridegroom. Beware then, O my soul, lest thou slumber and be left knocking without, like the five virgins; but persevere in watchfulness, that thou mayest go forth with gladness to meet Christ our God, and that He may grant thee the divine bridal chamber of His glory.'),
      P('Glory to the Father, and to the Son, and to the Holy Spirit, both now and ever, and unto the ages of ages. Amen.'),
      P('O most glorious Ever-Virgin, Mother of Christ our God, bear our prayer to thy Son and our God, that through thee He may save our souls.'),
      R('Then:'),
      P('Lord, have mercy.', 'Twelve times'),
      P('Remember, O Lord, them that sleep in hope of resurrection unto life eternal, our fathers and brethren and all who have gone before us in faith; and forgive them every transgression, voluntary and involuntary; and grant them rest where the light of Thy countenance shineth.'),
      P('Through the prayers of our holy fathers, O Lord Jesus Christ our God, have mercy on us. Amen.')
    ]) }
],

/* ---------------- MORNING ---------------- */
morning: [
  { id:'m-open', title:'The Beginning', by:'Rising from sleep',
    body: [].concat(BEGINNING, TRISAGION) },

  { id:'m-publican', title:'The Prayer of the Publican', by:'Luke 18:13',
    body:[ R('Bow low and say:'), P('O God, be merciful to me a sinner.') ] },

  { id:'m-mac2', title:'Arising from Sleep', by:'Second morning prayer of St. Macarius the Great',
    body:[
      P('Arising from sleep I thank Thee, O Holy Trinity, for that through Thy great goodness and long-suffering Thou hast not been wroth with me, slothful and sinful as I am, neither hast Thou destroyed me in mine iniquities; but hast shown Thy wonted love for mankind, and hast raised me up as I lay in heedlessness, that I might rise early and glorify Thy might.'),
      P('And now enlighten the eyes of my understanding; open my mouth to receive Thy words, and teach me Thy commandments; and help me to do Thy will, confessing Thee from my heart and singing praise unto Thine all-holy name: of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto the ages of ages. Amen.')
    ] },

  { id:'m-mac3', title:'To Thee, O Master', by:'Third morning prayer of St. Macarius the Great',
    body:[
      P('To Thee, O Master, Lover of mankind, I hasten on rising from sleep, and by Thy loving-kindness I go forth to do Thy work; and I pray to Thee: help me at all times and in all things; deliver me from every evil thing of this world and from the pursuit of the devil; save me and bring me into Thine eternal kingdom.'),
      P('For Thou art my Creator, and the Giver and Provider of everything good; in Thee is all my hope, and unto Thee do I send up glory, now and ever, and unto the ages of ages. Amen.')
    ] },

  { id:'m-mac4', title:'Thou Hast Granted Me the Night', by:'Fourth morning prayer of St. Macarius the Great',
    body:[
      P('O Lord, Who in Thine abundant goodness and great compassion hast granted me, Thy servant, to pass the time of the night that is past without assault from any opposing evil: do Thou Thyself, O Master and Creator of all things, vouchsafe that I may be enlightened by Thy true light, and with an enlightened heart do Thy will, now and ever, and unto the ages of ages. Amen.')
    ] },

  { id:'m-basil', title:'O Lord Almighty, God of the Powers', by:'Morning prayer of St. Basil the Great',
    body:[
      P('O Lord Almighty, God of the powers and of all flesh, Who dwellest on high and lookest down on things that are lowly, Who searchest out the hearts and inward parts and clearly foreknowest the secrets of men: O Unoriginate and Everlasting Light, with Whom there is no variableness, neither shadow of turning \u2014 do Thou Thyself, O Immortal King, receive our supplications, which we now, trusting in the multitude of Thy compassions, offer Thee from our impure lips.'),
      P('Forgive us our sins, in deed, word and thought, whether committed knowingly or in ignorance, and cleanse us from every defilement of flesh and spirit. Grant us to pass through the whole night of this present life with watchful heart and sober thought, ever awaiting the coming of the bright and appointed day of Thine Only-begotten Son, our Lord and God and Saviour Jesus Christ, when the Judge of all shall come with glory to render to each according to his deeds.'),
      P('May we not be found fallen and idle, but watching and roused to action, ready to accompany Him into the joy and divine palace of His glory, where there is the ceaseless sound of them that keep festival and the unspeakable delight of them that behold the ineffable beauty of Thy countenance. For Thou art the true Light that enlightenest and sanctifiest all, and all creation doth hymn Thee unto the ages of ages. Amen.')
    ] },

  { id:'m-theotokos', title:'I Hymn Thy Grace', by:'Morning prayer to the Most Holy Theotokos',
    body:[
      P('I hymn thy grace, O Sovereign Lady, and I pray thee: grace my mind. Teach me to walk aright in the way of Christ\u2019s commandments. Strengthen me to keep vigil in song, and drive away the sloth of slumber. O thou who art bound by thy supplications, loose me from the bonds of my sins.'),
      P('Guard and preserve me by night and by day, and deliver me from the foes that assail me. O Birthgiver of the Life-giving God, quicken me who am deadened by the passions. O thou who gavest birth to the never-setting Light, enlighten my blinded soul. O wondrous palace of the Master, make me a house of the Divine Spirit.'),
      P('O Physician who gavest birth to the Physician, heal the age-old passions of my soul. Turn me, who am tossed in the tempest of life, unto the path of repentance. Deliver me from the fire that is unquenchable, from the evil worm, and from hell. Let me not be shown to be the joy of demons, who am guilty of many sins. Renew me, grown old in senseless sins, O all-immaculate one. Show me free of every torment, and beseech the Master of all.')
    ] },

  { id:'m-jesus', title:'O Most Merciful Lord Jesus Christ', by:'Morning prayer to our Lord Jesus Christ',
    body:[
      P('O most merciful Lord Jesus Christ my God, for the sake of Thy many mercies forgive mine iniquities and transgressions, wherein I have sinned this night and all the days of my life, in word, deed and thought. Deliver me from the assaults of the invisible enemies, from the bonds of the passions and from every infirmity.'),
      P('Grant that I may fall down before Thee in a body free of passion and a soul at peace, and that I may glorify Thee, the good God, together with Thine Unoriginate Father and Thine All-holy Spirit, now and ever, and unto the ages of ages. Amen.')
    ] },

  { id:'m-angel', title:'To My Guardian Angel', by:'Morning prayer',
    body:[
      P('O holy Angel, attendant upon my wretched soul and my passionate life, forsake me not, a sinner, neither depart from me because of mine incontinence. Give no place to the evil demon to subdue me by the oppression of this mortal body. Take hold of my wretched and outstretched hand, and lead me in the way of salvation.'),
      P('O holy Angel of God, guardian and protector of my hapless soul and body, forgive me all things whatsoever I have offended thee this day; and deliver me from every assault of the enemy, that I may not anger God by any sin. Pray for me, a sinful and unworthy servant, that thou mayest present me worthy of the goodness and mercy of the All-holy Trinity and of the Mother of my Lord Jesus Christ, and of all the saints. Amen.')
    ] },

  { id:'m-lady', title:'O My Most Holy Lady Theotokos', by:'Morning prayer',
    body:[
      P('O my most holy Lady Theotokos, by thy holy and all-powerful prayers banish from me, thy lowly and wretched servant, despondency, forgetfulness, folly, negligence, and all impure, evil and blasphemous thoughts from my accursed heart and darkened mind.'),
      P('Quench the flame of my passions, for I am poor and wretched. Deliver me from many cruel memories and deeds, and free me from all their evil effects. For blessed art thou by all generations, and glorified is thy most honorable name unto the ages of ages. Amen.')
    ] },

  { id:'m-close', title:'The Conclusion', by:'Commemorations and dismissal',
    body:[
      R('Call to mind thy patron saint, and say:'),
      P('Pray to God for me, O holy saint (Name), well-pleasing to God, for I fervently flee unto thee, the speedy helper and intercessor for my soul.'),
      H('Hymns to the Theotokos'),
      P('It is truly meet to bless thee, the Theotokos, ever-blessed and most blameless, and the Mother of our God. More honorable than the Cherubim, and beyond compare more glorious than the Seraphim, who without corruption gavest birth to God the Word, the very Theotokos, thee do we magnify.'),
      P('O Virgin Theotokos, rejoice, Mary full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, for thou hast borne the Saviour of our souls.'),
      H('For the Living'),
      P('O Lord, save and have mercy on my spiritual father, my parents, my family and my kinsfolk, my friends and my enemies, on all who have asked my unworthy prayers, and on all Orthodox Christians; and grant them Thine earthly and heavenly good things.'),
      H('For the Departed'),
      P('O Lord, remember the souls of Thy departed servants, my parents and kinsfolk and benefactors, and all Orthodox Christians who have fallen asleep in the hope of the resurrection unto life eternal; forgive them every transgression, voluntary and involuntary, and grant them the Kingdom and the communion of Thine eternal good things and the enjoyment of Thine endless and blessed life.'),
      H('Dismissal'),
      P('It is meet and right to bless Thee, O God the Word, before Whom all creation trembleth and to Whom all things are subject. Save me, O Lord, and preserve me from all evil, that I may pass this day without sin unto Thy glory. Amen.'),
      P('Through the prayers of our holy fathers, O Lord Jesus Christ our God, have mercy on us. Amen.')
    ] }
],

/* ---------------- THE HOURS ---------------- */
first: [
  { id:'h1', title:'The First Hour', by:'Prayed at daybreak \u2014 the reader\u2019s form, abridged',
    body:[].concat(TRISAGION, [
      R('Psalms 5, 89 and 100 are appointed. If time is short, read the following verses in their place:'),
      V('My words give ear unto, O Lord; hear my cry. Attend unto the voice of my supplication, my King and my God, for unto Thee will I pray, O Lord. In the morning Thou shalt hear my voice; in the morning shall I stand before Thee, and Thou shalt look upon me.'),
      P('Glory to the Father, and to the Son, and to the Holy Spirit, both now and ever, and unto the ages of ages. Amen. Alleluia, alleluia, alleluia, glory to Thee, O God.', 'Thrice'),
      H('Troparion of the Hour'),
      P('In the morning hear my voice, my King and my God.'),
      V('My steps do Thou direct according to Thy saying, and let no iniquity have dominion over me.'),
      V('Deliver me from the false accusation of men, and I will keep Thy commandments.'),
      V('Make Thy face to shine upon Thy servant, and teach me Thy statutes.'),
      P('Let my mouth be filled with Thy praise, O Lord, that I may hymn Thy glory and Thy majesty all the day long.'),
      H('Theotokion'),
      P('What shall we call thee, O full of grace? Heaven, for thou hast shone forth the Sun of Righteousness. Paradise, for thou hast blossomed the flower of incorruption. Virgin, for thou hast remained undefiled. Pure Mother, for thou hast held in thy holy embrace the Son Who is God of all. Do thou entreat Him that our souls may be saved.')
    ], HOUR_ENDING, [
      H('Prayer of the First Hour'),
      P('O Christ, the true Light, Who enlightenest and sanctifiest every man that cometh into the world: let the light of Thy countenance be signed upon us, that in it we may behold the unapproachable Light; and direct our steps in the doing of Thy commandments, through the intercessions of Thy most pure Mother and of all Thy saints. Amen.')
    ]) }
],
third: [
  { id:'h3', title:'The Third Hour', by:'The descent of the Holy Spirit at Pentecost \u2014 the reader\u2019s form, abridged',
    body:[].concat(TRISAGION, [
      R('Psalms 16, 24 and 50 are appointed. If time is short, read the following verses in their place:'),
      V('Have mercy on me, O God, according to Thy great mercy, and according to the multitude of Thy compassions blot out my transgression. Wash me thoroughly from mine iniquity, and cleanse me from my sin.'),
      P('Glory to the Father, and to the Son, and to the Holy Spirit, both now and ever, and unto the ages of ages. Amen. Alleluia, alleluia, alleluia, glory to Thee, O God.', 'Thrice'),
      H('Troparion of the Hour'),
      P('O Lord, Who at the third hour didst send down Thy Most Holy Spirit upon Thine apostles: take Him not from us, O Good One, but renew Him in us who pray unto Thee.'),
      V('Create in me a clean heart, O God, and renew a right spirit within me.'),
      P('O Lord, Who at the third hour didst send down Thy Most Holy Spirit upon Thine apostles: take Him not from us, O Good One, but renew Him in us who pray unto Thee.'),
      V('Cast me not away from Thy presence, and take not Thy Holy Spirit from me.'),
      P('O Lord, Who at the third hour didst send down Thy Most Holy Spirit upon Thine apostles: take Him not from us, O Good One, but renew Him in us who pray unto Thee.'),
      H('Theotokion'),
      P('O Theotokos, thou art the true vine that hast budded forth for us the Fruit of life. Thee do we entreat: intercede, O Sovereign Lady, together with the apostles and all the saints, that our souls may find mercy.'),
      P('Blessed is the Lord God, blessed is the Lord day by day; the God of our salvation shall prosper us on our way; our God is the God of salvation.')
    ], HOUR_ENDING, [
      H('Prayer of the Third Hour'),
      P('O Master God, Father Almighty; O Lord, the Only-begotten Son, Jesus Christ; and Thou, O Holy Spirit: one Godhead, one Power, have mercy on me, a sinner; and by the judgments which Thou knowest, save me, Thine unworthy servant. For blessed art Thou unto the ages of ages. Amen.'),
      R('This prayer is of the holy martyr Mardarius.')
    ]) }
],
sixth: [
  { id:'h6', title:'The Sixth Hour', by:'The nailing of the Lord to the Cross \u2014 the reader\u2019s form, abridged',
    body:[].concat(TRISAGION, [
      R('Psalms 53, 54 and 90 are appointed. If time is short, read the following verses in their place:'),
      V('He that dwelleth in the help of the Most High shall abide in the shelter of the God of heaven. He shall say unto the Lord: Thou art my helper and my refuge; He is my God, and I will hope in Him.'),
      P('Glory to the Father, and to the Son, and to the Holy Spirit, both now and ever, and unto the ages of ages. Amen. Alleluia, alleluia, alleluia, glory to Thee, O God.', 'Thrice'),
      H('Troparion of the Hour'),
      P('O Thou Who on the sixth day and hour didst nail to the Cross the sin which rebellious Adam committed in Paradise: tear asunder also the handwriting of our transgressions, O Christ our God, and save us.'),
      V('Give ear, O God, unto my prayer, and disdain not my supplication.'),
      P('O Thou Who on the sixth day and hour didst nail to the Cross the sin which rebellious Adam committed in Paradise: tear asunder also the handwriting of our transgressions, O Christ our God, and save us.'),
      V('As for me, unto God have I cried, and the Lord hearkened unto me.'),
      P('O Thou Who on the sixth day and hour didst nail to the Cross the sin which rebellious Adam committed in Paradise: tear asunder also the handwriting of our transgressions, O Christ our God, and save us.'),
      H('Theotokion'),
      P('Since we have no boldness on account of our many sins, do thou entreat Him Who was born of thee, O Virgin Theotokos; for great is the supplication of a mother to win the favor of the Master. Disdain not the prayers of us sinners, O all-pure one, for He is merciful and mighty to save, Who deigned also to suffer for us.'),
      P('Let Thy compassions quickly go before us, O Lord, for we are become exceedingly poor. Help us, O God our Saviour, for the sake of the glory of Thy name; O Lord, deliver us and be gracious unto our sins, for Thy name\u2019s sake.')
    ], HOUR_ENDING, [
      H('Prayer of the Sixth Hour'),
      P('O God and Lord of hosts, and Maker of all creation, Who through the compassion of Thine incomprehensible mercy didst send down Thine Only-begotten Son, our Lord Jesus Christ, for the salvation of our race, and through His precious Cross didst tear asunder the handwriting of our sins and thereby didst triumph over the principalities and powers of darkness: do Thou Thyself, O Master, Lover of mankind, accept these prayers of thanksgiving and supplication from us sinners.'),
      P('Deliver us from every destructive and dark transgression, and from all the visible and invisible enemies that seek to do us evil. Nail down our flesh with the fear of Thee, and incline not our hearts unto words or thoughts of evil, but wound our souls with longing for Thee; that ever gazing upon Thee and guided by the light that cometh from Thee, and beholding Thee, the unapproachable and everlasting Light, we may send up unceasing praise and thanksgiving unto Thee, the Unoriginate Father, with Thine Only-begotten Son and Thine All-holy and good and life-creating Spirit, now and ever, and unto the ages of ages. Amen.')
    ]) }
],
ninth: [
  { id:'h9', title:'The Ninth Hour', by:'The death of the Lord in the flesh \u2014 the reader\u2019s form, abridged',
    body:[].concat(TRISAGION, [
      R('Psalms 83, 84 and 85 are appointed. If time is short, read the following verses in their place:'),
      V('How beloved are Thy dwellings, O Lord of hosts. My soul longeth and fainteth for the courts of the Lord; my heart and my flesh have rejoiced in the living God.'),
      P('Glory to the Father, and to the Son, and to the Holy Spirit, both now and ever, and unto the ages of ages. Amen. Alleluia, alleluia, alleluia, glory to Thee, O God.', 'Thrice'),
      H('Troparion of the Hour'),
      P('O Thou Who at the ninth hour didst for our sake taste of death in the flesh: mortify the wisdom of our flesh, O Christ our God, and save us.'),
      V('Let my supplication draw near before Thee, O Lord; according to Thy word give me understanding.'),
      P('O Thou Who at the ninth hour didst for our sake taste of death in the flesh: mortify the wisdom of our flesh, O Christ our God, and save us.'),
      V('Let my petition come before Thee, O Lord; according to Thy saying deliver me.'),
      P('O Thou Who at the ninth hour didst for our sake taste of death in the flesh: mortify the wisdom of our flesh, O Christ our God, and save us.'),
      H('Theotokion'),
      P('O thou who for our sake wast born of the Virgin and didst endure crucifixion, O Good One, Who by death didst despoil death and as God didst reveal the resurrection: disdain not those whom Thou hast fashioned with Thy hand; show forth Thy love for mankind, O Merciful One; accept the Theotokos who bore Thee, and who intercedeth for us; and save, O our Saviour, a despairing people.'),
      P('Forsake us not utterly, for Thy holy name\u2019s sake, and disannul not Thy covenant, and cause not Thy mercy to depart from us, for the sake of Abraham, who is beloved of Thee, and for the sake of Isaac, Thy servant, and Israel, Thy holy one.')
    ], HOUR_ENDING, [
      H('Prayer of the Ninth Hour'),
      P('O Master, Lord Jesus Christ our God, Who hast long-suffered our transgressions and hast brought us to this present hour, wherein Thou didst hang upon the life-giving tree and didst make a way into Paradise for the wise thief, and didst destroy death by death: cleanse us sinners and Thine unworthy servants.'),
      P('For we have sinned and transgressed, and are not worthy to lift up our eyes and look upon the height of heaven, because we have forsaken the path of Thy righteousness and have walked in the desires of our own hearts. But we implore Thine incomparable goodness: spare us, O Lord, according to the multitude of Thy mercy, and save us for Thy holy name\u2019s sake, for our days are consumed in vanity. Deliver us from the hand of the adversary, and forgive us our sins, and mortify our carnal mind; that having put off the old man, we may be clothed with the new, and may live unto Thee, our Master and Benefactor. Amen.')
    ]) }
],

/* ---------------- EVENING ---------------- */
evening: [
  { id:'e-open', title:'The Beginning', by:'Before sleep',
    body:[].concat([
      R('Stand reverently, make the sign of the Cross, and say:'),
      P('In the name of the Father, and of the Son, and of the Holy Spirit. Amen.'),
      P('Glory to Thee, our God, glory to Thee.')
    ], TRISAGION) },

  { id:'e-mac', title:'O Eternal God and King of All Creation', by:'First evening prayer of St. Macarius the Great',
    body:[
      P('O eternal God and King of all creation, Who hast granted me to arrive at this hour: forgive me the sins that I have committed this day in deed, word and thought; and cleanse, O Lord, my humble soul from every defilement of flesh and spirit.'),
      P('And grant me, O Lord, to pass the sleep of this night in peace, that rising from my lowly bed I may please Thy most holy name all the days of my life, and trample underfoot the enemies, both fleshly and bodiless, that war against me. And deliver me, O Lord, from the vain thoughts that stain me and from evil desires. For Thine is the kingdom, and the power, and the glory, of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto the ages of ages. Amen.')
    ] },

  { id:'e-antiochus', title:'O Almighty Word of the Father', by:'Second evening prayer, of St. Antiochus of Palestine',
    body:[
      P('O Almighty Word of the Father, Jesus Christ our God, Who Thyself art perfect: for the sake of the multitude of Thy compassions never depart from me, Thy servant, but ever abide in me. O Jesus, Good Shepherd of Thy sheep, deliver me not over to the rebellion of the serpent, and leave me not to the will of Satan, for the seed of corruption is in me.'),
      P('But do Thou, O Lord, worshipful God, holy King, Jesus Christ, as I sleep guard me by the unwaning Light, Thy Holy Spirit, by Whom Thou didst sanctify Thy disciples. O Lord, grant me, Thine unworthy servant, Thy salvation upon my bed. Enlighten my mind with the light of understanding of Thy holy Gospel, my soul with the love of Thy Cross, my heart with the purity of Thy word, my body with Thy passionless passion. Keep my thought in Thy humility, and raise me up at the proper time for Thy glorification. For most glorified art Thou with Thine Unoriginate Father and the Most Holy Spirit unto the ages. Amen.')
    ] },

  { id:'e-hours', title:'Prayer for Every Hour', by:'St. John Chrysostom \u2014 twenty-four brief petitions',
    body:[
      R('One for each hour of the day and night. Pray them slowly, without haste.'),
      P('O Lord, deprive me not of Thy heavenly good things.'),
      P('O Lord, deliver me from eternal torment.'),
      P('O Lord, if I have sinned in mind or thought, in word or deed, forgive me.'),
      P('O Lord, deliver me from all ignorance and forgetfulness, from despondency and stony insensibility.'),
      P('O Lord, deliver me from every temptation.'),
      P('O Lord, enlighten my heart which evil desire hath darkened.'),
      P('O Lord, I, being human, have sinned; do Thou, being God, forgive me in Thy loving-kindness, for Thou knowest the weakness of my soul.'),
      P('O Lord, send down Thy grace to help me, that I may glorify Thy holy name.'),
      P('O Lord Jesus Christ, inscribe me, Thy servant, in the Book of Life, and grant me a good end.'),
      P('O Lord my God, even though I have done nothing good in Thy sight, yet grant me by Thy grace to make a good beginning.'),
      P('O Lord, sprinkle into my heart the dew of Thy grace.'),
      P('O Lord of heaven and earth, remember me, Thy sinful servant, shameful and unclean, in Thy Kingdom.'),
      P('O Lord, receive me in repentance.'),
      P('O Lord, leave me not.'),
      P('O Lord, lead me not into temptation.'),
      P('O Lord, grant me good thoughts.'),
      P('O Lord, grant me tears, and remembrance of death, and compunction.'),
      P('O Lord, grant me the thought of confessing my sins.'),
      P('O Lord, grant me humility, chastity and obedience.'),
      P('O Lord, grant me patience, magnanimity and meekness.'),
      P('O Lord, implant in me the root of good things, even the fear of Thee, in my heart.'),
      P('O Lord, vouchsafe that I may love Thee with all my soul and mind, and do Thy will in all things.'),
      P('O Lord, shelter me from certain men, and demons, and passions, and from every other unseemly thing.'),
      P('O Lord, Thou knowest that Thou doest as Thou wilt; may Thy will be done also in me, a sinner; for blessed art Thou unto the ages. Amen.')
    ] },

  { id:'e-ioannikios', title:'The Father Is My Hope', by:'St. Ioannikios the Great',
    body:[ P('The Father is my hope, the Son is my refuge, the Holy Spirit is my protection. O Holy Trinity, glory to Thee.') ] },

  { id:'e-theotokos', title:'O Good Mother of the Good King', by:'Evening prayer to the Theotokos',
    body:[
      P('O good Mother of the good King, most pure and blessed Theotokos Mary: do thou pour out the mercy of thy Son and our God upon my passionate soul, and by thy prayers guide me unto good works, that I may pass the rest of my life without blemish, and through thee may attain to Paradise, O Virgin Theotokos, who alone art pure and blessed.'),
      P('O Virgin Theotokos, rejoice, Mary full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, for thou hast borne the Saviour of our souls.')
    ] },

  { id:'e-angel', title:'To My Guardian Angel', by:'Evening prayer',
    body:[
      P('O Angel of Christ, my holy guardian and protector of my soul and body: forgive me all things wherein I have offended thee this day, and deliver me from every wile of the enemy that opposeth me, that I may not anger my God by any sin. Pray for me, a sinful and unworthy servant, that thou mayest present me worthy of the goodness and mercy of the All-holy Trinity and of the Mother of my Lord Jesus Christ, and of all the saints. Amen.')
    ] },

  { id:'e-damascene', title:'Is This Bed to Be My Coffin?', by:'St. John of Damascus \u2014 said while pointing to the bed',
    body:[
      R('Turn toward thy bed and say:'),
      P('O Master, Lover of mankind: is this bed to be my coffin, or wilt Thou yet enlighten my wretched soul with another day? Behold, the coffin lieth before me; behold, death confronteth me. I fear, O Lord, Thy judgment and the endless torments; yet I cease not to do evil.'),
      P('My Lord God, I continually anger Thee, and Thy most pure Mother, and all the heavenly hosts, and my holy guardian angel. I know, O Lord, that I am unworthy of Thy love for mankind, but am worthy of every condemnation and torment. But whether I will or no, save me, O Lord. For to save a good man is no great thing, and to have mercy on the pure is nothing wonderful, for they are worthy of Thy mercy. But show the wonder of Thy mercy upon me, a sinner. In this reveal Thy love for mankind, lest my wickedness prevail over Thine unutterable goodness and mercy; and order my life as Thou wilt.')
    ] },

  { id:'e-close', title:'The Conclusion', by:'The daily confession and dismissal',
    body:[
      H('Daily Confession of Sins'),
      P('I confess to Thee, my Lord God and Creator, in the Holy Trinity glorified and worshipped, Father, Son and Holy Spirit, all my sins which I have committed all the days of my life, and at every hour, in the present time and in the days past and nights, in deed, word and thought: by gluttony, drunkenness, secret eating, idle talking, despondency, indolence, contradiction, negligence, self-love, avarice, unjust judging, laxity, self-justification, disobedience, murmuring, slander, irritability, resentment, anger, envy, greed, lying, and every sin of my senses and every movement of my soul \u2014 wherewith I have angered Thee my God, and wronged my neighbor. Grieving for this, I present myself guilty before Thee, my God, and I desire to repent. Only, O Lord my God, help me, humbly entreating Thee with tears: forgive my past sins by Thy mercy, and absolve me of all that I have confessed before Thee, for Thou art good and lovest mankind.'),
      H('Dismissal'),
      P('O Lord our God, in whatsoever I have sinned this day in word, deed and thought, do Thou, as good and man-befriending, forgive me. Grant me peaceful and undisturbed sleep. Send Thy guardian angel to shelter and preserve me from every evil. For Thou art the guardian of our souls and bodies, and unto Thee do we send up glory, to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto the ages of ages. Amen.'),
      R('Then, lying down, sign thyself with the Cross and say:'),
      P('Into Thy hands, O Lord Jesus Christ my God, I commit my spirit. Do Thou bless me, do Thou have mercy on me, and grant me life eternal. Amen.')
    ] }
],

/* ---------------- COMPLINE ---------------- */
compline: [
  { id:'c-small', title:'Small Compline', by:'The completion of the day \u2014 abridged for private use',
    body:[].concat(TRISAGION, [
      H('The Symbol of Faith'),
      P('I believe in one God, the Father Almighty, Maker of heaven and earth, and of all things visible and invisible. And in one Lord Jesus Christ, the Son of God, the Only-begotten, begotten of the Father before all ages; Light of Light, true God of true God; begotten, not made; of one essence with the Father, by Whom all things were made; Who for us men and for our salvation came down from the heavens, and was incarnate of the Holy Spirit and the Virgin Mary, and became man; and was crucified for us under Pontius Pilate, and suffered, and was buried; and arose again on the third day according to the Scriptures; and ascended into the heavens, and sitteth at the right hand of the Father; and shall come again with glory to judge the living and the dead, Whose kingdom shall have no end.'),
      P('And in the Holy Spirit, the Lord, the Giver of life, Who proceedeth from the Father; Who with the Father and the Son together is worshipped and glorified; Who spake by the prophets. In one Holy, Catholic and Apostolic Church. I confess one baptism for the remission of sins. I look for the resurrection of the dead, and the life of the age to come. Amen.'),
      H('Prayer to the Most Holy Theotokos'),
      P('O undefiled, untainted, uncorrupt, most pure, chaste Virgin, Bride of God and Sovereign Lady: who by thy wondrous conceiving didst unite God the Word with men, and didst join the fallen nature of our race to the heavenly; who art the only hope of the hopeless and the helper of the embattled, the ever-ready protection of them that hasten unto thee, and the refuge of all Christians \u2014 disdain me not, a defiled sinner, who have made myself utterly useless by shameful thoughts and words and deeds, and through slothfulness of mind have become a slave to the pleasures of life.'),
      P('But as the Mother of God Who loveth mankind, in thy love for mankind have compassion on me, a sinner and a prodigal; accept my prayer, which is offered thee out of defiled lips; and using thy boldness as a Mother, entreat thy Son, our Master and Lord, that He may open unto me the compassionate bowels of His goodness, and passing over my numberless offenses, may turn me to repentance and show me to be an approved doer of His commandments. And be thou ever present with me, O merciful and compassionate one; in this present life be thou a fervent intercessor and helper, warding off the assaults of the enemies and guiding me to salvation; and at the time of my departure keep my wretched soul, and drive far from it the dark countenances of the evil demons. Amen.'),
      H('Prayer to our Lord Jesus Christ'),
      P('O Lord Jesus Christ our God, Who art always merciful and lovest mankind: hear my prayer, and grant unto us, O Master, as we go to sleep, rest of body and soul. Preserve us from the gloomy sleep of sin and from every dark and nocturnal pleasure. Still the impulses of the passions, quench the fiery darts of the evil one which are craftily aimed against us, subdue the rebellions of our flesh, and put to sleep our every earthly and material thought.'),
      P('And grant us, O God, a watchful mind, chaste thought, a sober heart, and a sleep light and free from every satanic fantasy. And raise us up at the hour of prayer, established in Thy commandments and holding steadfastly within us the remembrance of Thy judgments. Grant us to sing Thy glory the whole night through, that we may praise and bless and glorify Thine all-honorable and majestic name, of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto the ages of ages. Amen.'),
      H('The Song of St. Symeon'),
      P('Now lettest Thou Thy servant depart in peace, O Master, according to Thy word; for mine eyes have seen Thy salvation, which Thou hast prepared before the face of all peoples: a light of revelation for the Gentiles, and the glory of Thy people Israel.'),
      H('Dismissal'),
      P('O most glorious Ever-Virgin, blessed Theotokos, present our prayer to thy Son and our God, and beseech Him that through thee He may save our souls.'),
      P('My hope is the Father, my refuge is the Son, my protection is the Holy Spirit. O Holy Trinity, glory to Thee.'),
      P('Through the prayers of our holy fathers, O Lord Jesus Christ our God, have mercy on us. Amen.'),
      R('Then ask forgiveness of any who are with thee, and go to sleep in silence.')
    ]) }
],

/* ---------------- INTERCESSIONS ---------------- */
theotokos: [
  { id:'t-axion', title:'It Is Truly Meet', by:'Axion Estin',
    body:[ P('It is truly meet to bless thee, the Theotokos, ever-blessed and most blameless, and the Mother of our God. More honorable than the Cherubim, and beyond compare more glorious than the Seraphim, who without corruption gavest birth to God the Word, the very Theotokos, thee do we magnify.') ] },
  { id:'t-rejoice', title:'O Virgin Theotokos, Rejoice', by:'The angelic salutation',
    body:[ P('O Virgin Theotokos, rejoice, Mary full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, for thou hast borne the Saviour of our souls.') ] },
  { id:'t-beneath', title:'Beneath Thy Compassion', by:'The most ancient prayer to the Mother of God, from third-century Egypt',
    body:[ P('Beneath thy compassion we take refuge, O Theotokos. Disdain not our supplications in adversity, but deliver us from perils, O only pure, only blessed one.') ] },
  { id:'t-champion', title:'To Thee, the Champion Leader', by:'Kontakion of the Akathist',
    body:[ P('To thee, the Champion Leader, do we thy servants dedicate a feast of victory and of thanksgiving, as ones rescued out of sufferings, O Theotokos. But as thou art one with might which is invincible, from all dangers that can be do thou deliver us, that we may cry to thee: Rejoice, O unwedded Bride.') ] },
  { id:'t-lady', title:'O My Most Holy Lady Theotokos', by:'Against despondency and evil thoughts',
    body:[
      P('O my most holy Lady Theotokos, by thy holy and all-powerful prayers banish from me, thy lowly and wretched servant, despondency, forgetfulness, folly, negligence, and all impure, evil and blasphemous thoughts from my accursed heart and darkened mind.'),
      P('Quench the flame of my passions, for I am poor and wretched. Deliver me from many cruel memories and deeds, and free me from all their evil effects. For blessed art thou by all generations, and glorified is thy most honorable name unto the ages of ages. Amen.')
    ] },
  { id:'t-hope', title:'My Hope Is the Father', by:'A short prayer for any moment',
    body:[
      P('O Theotokos, my hope, protection and refuge, thou art the joy of my heart; unto thee I flee, and to thee I entrust my whole life. Do thou order it as thou wilt.'),
      P('It is meet in truth to call thee blessed, the Theotokos, ever-blessed and most blameless, and the Mother of our God.')
    ] }
],

angel: [
  { id:'a-morning', title:'Morning Prayer to the Guardian Angel', by:'On rising',
    body:[
      P('O holy Angel, attendant upon my wretched soul and my passionate life, forsake me not, a sinner, neither depart from me because of mine incontinence. Give no place to the evil demon to subdue me by the oppression of this mortal body. Take hold of my wretched and outstretched hand, and lead me in the way of salvation.'),
      P('Yea, O holy Angel of God, guardian and protector of my hapless soul and body: forgive me all things whatsoever I have offended thee, all the days of my life, and if I have sinned in anything this past night. Shelter me in the present day, and guard me from every temptation of the adversary, that I may not anger God by any sin; and pray for me to the Lord, that He may establish me in His fear, and show me a servant worthy of His goodness. Amen.')
    ] },
  { id:'a-evening', title:'Evening Prayer to the Guardian Angel', by:'Before sleep',
    body:[
      P('O Angel of Christ, my holy guardian and protector of my soul and body: forgive me all things wherein I have offended thee this day, and deliver me from every wile of the enemy that opposeth me, that I may not anger my God by any sin.'),
      P('Pray for me, a sinful and unworthy servant, that thou mayest present me worthy of the goodness and mercy of the All-holy Trinity and of the Mother of my Lord Jesus Christ, and of all the saints. Amen.')
    ] },
  { id:'a-troparion', title:'Troparion and Kontakion', by:'To the Guardian Angel',
    body:[
      H('Troparion, Tone 6'),
      P('O Angel of God, my holy guardian, given me from God from heaven: I earnestly entreat thee, do thou enlighten me this day, and save me from every evil, guide me toward good deeds, and direct me on the path of salvation.'),
      H('Kontakion, Tone 4'),
      P('Show me to be an honorable and worthy servant of the Heavenly Master, O my guardian, given me by God; for thou art my protector and my helper, and I have thee as my fervent intercessor before God.'),
      H('Prayer'),
      P('O holy Angel of Christ, I fall down and pray to thee, my holy guardian, given me at holy baptism for the protection of my soul and my sinful body. By mine indolence and mine evil habits I have angered thy most pure light, and have driven thee from me by all my shameful deeds. But I pray thee, disdain me not, but be merciful to me and forsake me not, wretched though I be; enlighten my mind, and guide me on the path of salvation; and at the terrible hour of death be near me, driving away the evil demons, and at the dread judgment deliver me from the eternal torment. Amen.')
    ] }
],

silouan: [
  { id:'s-troparion', title:'Troparion and Kontakion', by:'St. Silouan the Athonite \u2014 reposed 1938, glorified 1987',
    body:[
      H('Troparion, Tone 2'),
      P('Thou didst pray fervently unto the Lord for all mankind, and wast granted to know the depths of His love; O Silouan, teacher of humility and vessel of the Spirit, entreat Christ our God that our souls may be saved.'),
      H('Kontakion, Tone 4'),
      P('The Lord taught thee to keep thy mind in hell and not to despair, and thy heart was widened for the whole world; wherefore, O righteous Silouan, thou dost cry unceasingly: My soul longeth for the Lord.'),
      H('Magnification'),
      P('We bless thee, O righteous Father Silouan, and we honor thy holy memory, thou guide of monastics and converser with the angels.')
    ] },
  { id:'s-prayer', title:'A Prayer to St. Silouan', by:'Supplication in the traditional form',
    body:[
      R('The prayer below is a supplication composed in the customary manner. The saint\u2019s own writings are set apart in the section that follows.'),
      P('O righteous Father Silouan, athlete of Mount Athos and friend of the poor in spirit: thou who didst labor in the simplest of tasks and wast lifted up to the vision of the uncreated Light, look upon me who am scattered in mind and cold of heart.'),
      P('Thou hast learned the way of them that weep for the whole world; teach me also to pray for those whom I have judged, and to love those whom I have counted as enemies. Beg of Christ our God that He grant me the humility that draweth down His grace, patience in the losing of it, and unwavering hope in the hour when the soul findeth no comfort in anything upon the earth.'),
      P('Grant that my soul also may long for the Lord, and that in all my sorrows I may keep His word and despair not; that with thee and with all the saints I may glorify the Father, and the Son, and the Holy Spirit, now and ever, and unto the ages of ages. Amen.')
    ] },
  { id:'s-words', title:'The Saint\u2019s Own Words', by:'St. Silouan the Athonite \u2014 sayings for meditation',
    body:[
      R('Read one, and stay with it. These are for pondering, not for reciting.'),
      P('\u201CKeep thy mind in hell, and despair not.\u201D'),
      R('The word given him by the Lord in his affliction.'),
      P('\u201CMy soul longeth for the Lord.\u201D'),
      R('The refrain that runs through all his writings.'),
      P('\u201CThe man who knows not the love of God cannot know rest.\u201D'),
      P('\u201CTo pray for people is to shed blood.\u201D'),
      R('The saint held that the whole of the spiritual life may be measured by one thing: the love of enemies. Where that love is absent, grace has withdrawn; where it is present, the Holy Spirit is at work.')
    ] }
],

/* ---------------- RECENTER ---------------- */
recenter: [
  { id:'r-cannot', title:'When You Cannot Pray', by:'The shortest cries, for when words will not come',
    body:[
      R('Say one of these, slowly, as many times as you need. Nothing more is required of you.'),
      P('Lord Jesus Christ, Son of God, have mercy on me, a sinner.'),
      P('Lord, have mercy.'),
      P('O God, be merciful to me a sinner.'),
      P('Lord, I believe; help Thou mine unbelief.'),
      R('If even these are too many, breathe the Name alone:'),
      P('Jesus.'),
      R('The Fathers teach that God does not measure the length of a prayer, but the turning of the heart toward Him. A single word said in weakness is heard.')
    ] },

  { id:'r-arise', title:'Let God Arise', by:'Psalm 67 and the Prayer of the Precious Cross \u2014 against assault and temptation',
    body:[
      R('Make the sign of the Cross, and say:'),
      P('Let God arise, and let His enemies be scattered, and let them that hate Him flee from before His face.'),
      P('As smoke vanisheth, so let them vanish; as wax melteth before the fire, so let the demons perish from the presence of them that love God and who sign themselves with the sign of the Cross, and say in gladness:'),
      P('Hail, most precious and life-giving Cross of the Lord, for thou drivest away the demons by the power of our Lord Jesus Christ, Who was crucified upon thee, Who went down to hades and trampled upon the power of the devil, and gave thee, His precious Cross, unto us for the driving away of every adversary.'),
      P('O most precious and life-giving Cross of the Lord, help me, together with the holy Lady Virgin Theotokos and all the saints unto the ages. Amen.'),
      H('Troparion of the Cross'),
      P('O Lord, save Thy people and bless Thine inheritance; grant victory over adversaries, and by the power of Thy Cross preserve Thy commonwealth.'),
      R('The battle is not yours to win. It is His, and it is already won; you are asking to be sheltered within a victory that has been accomplished.')
    ] },

  { id:'r-strength', title:'For Strength and Courage', by:'When you are afraid, or too tired to go on',
    body:[
      H('From the Psalms'),
      V('The Lord is my light and my saviour; whom then shall I fear? The Lord is the defender of my life; of whom then shall I be afraid? Though a host should array itself against me, my heart shall not be afraid; though war should rise up against me, in this have I hoped.'),
      V('He that dwelleth in the help of the Most High shall abide in the shelter of the God of heaven. He shall say unto the Lord: Thou art my helper and my refuge; He is my God, and I will hope in Him. With His shoulders will He overshadow thee, and under His wings shalt thou have hope; His truth shall encompass thee as a shield.'),
      V('God is our refuge and strength, a helper in the afflictions that mightily befall us. Therefore will we not fear when the earth be shaken.'),
      H('Prayer'),
      R('The prayer below is a supplication composed in the customary manner.'),
      P('O Lord Jesus Christ my God, Thou didst sweat blood in the garden and didst not turn back; Thou knowest what it is to be pressed beyond bearing. Look upon me now, for my strength is spent and my courage has failed.'),
      P('Go before me into what I am afraid of. Fight this battle for me, for I cannot fight it. Where I am weak, be Thou my strength; where I am a coward, be Thou my courage; where I see nothing ahead, be Thou the light upon the path. Let me not run from what Thou hast given me to carry, but set Thy hand under it.'),
      P('And if the burden is not taken away, then give me what Thou gavest Thy saints: to stand, and to keep standing, and to be found still standing at the end. For Thou art the strength of them that have none, and unto Thee do I send up glory, with Thine Unoriginate Father and Thine All-holy Spirit, now and ever, and unto the ages of ages. Amen.')
    ] },

  { id:'r-light', title:'Come, O True Light', by:'St. Symeon the New Theologian \u2014 invocation of the Holy Spirit',
    body:[
      P('O Heavenly King, Comforter, Spirit of Truth, Who art everywhere present and fillest all things, Treasury of good things and Giver of life: come and abide in us, and cleanse us from every impurity, and save our souls, O Good One.'),
      H('The Invocation'),
      R('Say this slowly. It is meant to be waited through, not read.'),
      P('Come, O true Light. Come, O eternal Life. Come, O hidden Mystery. Come, O nameless Treasure. Come, O ineffable Reality. Come, O inconceivable Person.'),
      P('Come, O endless Bliss. Come, O never-setting Light. Come, O infallible Expectation of all that are to be saved. Come, O awakening of them that sleep. Come, O resurrection of the dead.'),
      P('Come, O Almighty, ever creating and recreating and transforming by Thy will alone. Come, O Thou Who hast desired and dost desire my wretched soul. Come, Thou Who alone comest to me, who am alone, since Thou seest that I am alone. Come, Thou Who hast separated me from all things and made me solitary in this world. Come, Thou Who hast become the very desire within me, and hast caused me to desire Thee, the wholly unapproachable.'),
      P('Come, my breath and my life. Come, the consolation of my humble soul. Come, my joy, my glory, my endless delight.'),
      R('Then be still a little while, and say nothing at all.')
    ] },

  { id:'r-ephraim', title:'Turn Me From What Torments Me', by:'The Prayer of St. Ephraim the Syrian',
    body:[
      R('Prayed with prostrations in Lent; said standing at other times. It names the very things that torment, and asks for their opposites.'),
      P('O Lord and Master of my life, give me not a spirit of sloth, despondency, love of power, and idle talk.'),
      R('Bow low.'),
      P('But grant unto me, Thy servant, a spirit of chastity, humility, patience and love.'),
      R('Bow low.'),
      P('Yea, O Lord and King, grant me to see mine own transgressions and not to judge my brother; for blessed art Thou unto the ages of ages. Amen.'),
      R('Bow low.'),
      H('Against the thought that will not leave'),
      P('O Lord, deliver me from all ignorance and forgetfulness, from despondency and stony insensibility. O Lord, enlighten my heart which evil desire hath darkened. O Lord, shelter me from certain men, and demons, and passions, and from every other unseemly thing.'),
      P('O most holy Lady Theotokos, by thy holy and all-powerful prayers banish from me, thy lowly servant, despondency, forgetfulness, folly, negligence, and all impure, evil and blasphemous thoughts from my heart and darkened mind. Quench the flame of my passions, for I am poor and wretched.'),
      R('A tempting thought is not a sin. Do not argue with it, and do not follow it down; turn from it to the Name of the Lord, as often as it returns.')
    ] },

  { id:'r-ps50', title:'Psalm 50', by:'The psalm of repentance \u2014 prayed daily throughout the Church',
    body:[
      R('No psalm is read more often in Orthodox worship than this one. It is in the Midnight Office, in Matins, in the Third Hour, in the prayers before confession. When you do not know what to pray, pray this.'),
      P('Have mercy on me, O God, according to Thy great mercy; and according to the multitude of Thy compassions blot out my transgression. Wash me thoroughly from mine iniquity, and cleanse me from my sin.'),
      P('For I know mine iniquity, and my sin is ever before me. Against Thee only have I sinned and done this evil before Thee, that Thou mightest be justified in Thy words, and prevail when Thou art judged.'),
      P('For behold, I was conceived in iniquities, and in sins did my mother bear me. For behold, Thou hast loved truth; the hidden and secret things of Thy wisdom hast Thou made manifest unto me.'),
      P('Thou shalt sprinkle me with hyssop, and I shall be made clean; Thou shalt wash me, and I shall be made whiter than snow. Thou shalt make me to hear joy and gladness; the bones that be humbled, they shall rejoice.'),
      P('Turn Thy face away from my sins, and blot out all mine iniquities. Create in me a clean heart, O God, and renew a right spirit within me.'),
      P('Cast me not away from Thy presence, and take not Thy Holy Spirit from me. Restore unto me the joy of Thy salvation, and with Thy governing Spirit establish me.'),
      P('I shall teach transgressors Thy ways, and the ungodly shall turn back unto Thee. Deliver me from blood-guiltiness, O God, Thou God of my salvation; my tongue shall rejoice in Thy righteousness.'),
      P('O Lord, Thou shalt open my lips, and my mouth shall declare Thy praise. For if Thou hadst desired sacrifice, I had given it; with whole-burnt offerings Thou shalt not be pleased.'),
      P('A sacrifice unto God is a broken spirit; a heart that is broken and humbled God will not despise.'),
      P('Do good, O Lord, in Thy good pleasure unto Sion, and let the walls of Jerusalem be builded. Then shalt Thou be pleased with a sacrifice of righteousness, with oblation and whole-burnt offerings. Then shall they offer bullocks upon Thine altar.'),
      R('The psalm does not end in despair. It ends with the walls being rebuilt.')
    ] },

  { id:'r-repent', title:'Sins Voluntary and Involuntary', by:'The prayer of forgiveness',
    body:[
      R('Read Psalm 50 first, on the page before this one. Then:'),
      P('O Lord, forgive me all my sins, voluntary and involuntary, of word and of deed, committed in knowledge and in ignorance, by day and by night, in mind and in thought. Forgive me all, for Thou art good and lovest mankind.'),
      P('O Lord Jesus Christ, Son of God, I have sinned against heaven and before Thee, and am no more worthy to be called Thy son; yet Thou hast said that Thou wilt in no wise cast out him that cometh unto Thee. Behold, I am come. Receive me as one of Thy hired servants, and make me again what Thou hast made me at the font, cleansed and Thine.'),
      R('Repentance is not despair over what you are; it is turning around. If a sin is grave, or it will not let you go, bring it to your spiritual father in confession \u2014 that is where absolution is given, and this book is no substitute for it.')
    ] },

  { id:'r-optina', title:'For Whatever This Day Brings', by:'The Prayer of the Elders of Optina',
    body:[
      P('O Lord, grant that I may meet all that this coming day brings to me with spiritual tranquility. Grant that I may fully surrender myself to Thy holy will.'),
      P('At every hour of this day, direct and support me in all things. Whatsoever news may reach me in the course of the day, teach me to accept it with a calm soul and the firm conviction that all is subject to Thy holy will.'),
      P('Direct my thoughts and feelings in all my words and deeds. In all unexpected occurrences, do not let me forget that all is sent down from Thee.'),
      P('Grant that I may deal straightforwardly and wisely with every member of my family, neither embarrassing nor saddening anyone.'),
      P('O Lord, grant me the strength to endure the fatigue of the coming day and all the events that take place during it. Direct my will and teach me to pray, to believe, to hope, to be patient, to forgive, and to love. Amen.')
    ] }
],

/* ---------------- SERVED IN CHURCH ---------------- */
vespers: [
  { id:'vespers', title:'Vespers', by:'The lighting of the lamps \u2014 the unchanging portions',
    body:[
      R('Vespers is served in church, and with it the liturgical day begins. What follows is the fixed heart of the service, which never changes. The psalms, stichera and troparia appointed for each particular day are drawn from the Octoechos, the Menaion, the Triodion and the Pentecostarion, and are not contained in this book.'),
      H('The Introductory Psalm'),
      V('Bless the Lord, O my soul. O Lord my God, Thou hast been magnified exceedingly. Confession and majesty hast Thou put on, Who coverest Thyself with light as with a garment, Who stretchest out the heavens as it were a curtain.'),
      V('How magnified are Thy works, O Lord. In wisdom hast Thou made them all. The earth is filled with Thy creation. Glory to Thee, O Lord, Who hast made them all.'),
      H('O Gladsome Light'),
      R('The most ancient hymn of the Church still in daily use, sung as the evening lamps are lit.'),
      P('O gladsome Light of the holy glory of the Immortal Father, the heavenly, the holy, the blessed, O Jesus Christ: now that we have come to the setting of the sun and behold the light of evening, we praise God: Father, Son and Holy Spirit.'),
      P('For meet it is at all times that Thou be hymned with reverent voices, O Son of God, Giver of life; wherefore the world doth glorify Thee.'),
      H('Vouchsafe, O Lord'),
      P('Vouchsafe, O Lord, to keep us this evening without sin. Blessed art Thou, O Lord, the God of our fathers, and praised and glorified is Thy name unto the ages. Amen.'),
      P('Let Thy mercy be upon us, O Lord, even as we have set our hope on Thee. Blessed art Thou, O Lord; teach me Thy statutes. Blessed art Thou, O Master; give me understanding of Thy statutes. Blessed art Thou, O Holy One; enlighten me by Thy statutes.'),
      P('O Lord, Thy mercy endureth forever; disdain not the works of Thy hands. To Thee is due praise, to Thee is due song, to Thee is due glory: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto the ages of ages. Amen.'),
      H('The Song of St. Symeon'),
      P('Now lettest Thou Thy servant depart in peace, O Master, according to Thy word; for mine eyes have seen Thy salvation, which Thou hast prepared before the face of all peoples: a light of revelation for the Gentiles, and the glory of Thy people Israel.'),
      R('If you cannot be at Vespers, the Evening Prayers in your rule are what is kept at home. They do not replace the service, and they are not meant to.')
    ] }
],

matins: [
  { id:'matins', title:'Matins', by:'The day\u2019s first light \u2014 the unchanging portions',
    body:[
      R('Matins is served in church, and is the longest of the daily services. Its canons, katavasias and festal hymns change every day according to the saint or feast commemorated. What follows is the fixed frame within which all of that is set.'),
      H('The Six Psalms'),
      R('Read in near darkness, in silence, without interruption: Psalms 3, 37, 62, 87, 102 and 142.'),
      V('O Lord, how are they multiplied that afflict me. But Thou, O Lord, art my helper, my glory, and the lifter up of my head. I laid me down and slept; I awoke, for the Lord will help me.'),
      V('O God, my God, unto Thee I rise early at dawn. My soul hath thirsted for Thee; how often hath my flesh longed after Thee in a land barren and untrodden and unwatered.'),
      H('God Is the Lord'),
      P('God is the Lord, and hath appeared unto us. Blessed is he that cometh in the name of the Lord.'),
      R('Then the troparion of the day, and the canons appointed for the feast.'),
      H('The Great Doxology'),
      R('Sung as the light returns.'),
      P('Glory to Thee Who hast shown us the light. Glory to God in the highest, and on earth peace, good will among men.'),
      P('We praise Thee, we bless Thee, we worship Thee, we glorify Thee, we give thanks to Thee for Thy great glory. O Lord, heavenly King, God the Father Almighty; O Lord, the Only-begotten Son, Jesus Christ; and O Holy Spirit.'),
      P('O Lord God, Lamb of God, Son of the Father, that takest away the sin of the world, have mercy on us; Thou that takest away the sins of the world, receive our prayer; Thou that sittest at the right hand of the Father, have mercy on us. For Thou only art holy, Thou only art the Lord, O Jesus Christ, to the glory of God the Father. Amen.'),
      P('Every day will I bless Thee, and I will praise Thy name forever, and unto the ages of ages. Vouchsafe, O Lord, to keep us this day without sin. Blessed art Thou, O Lord, the God of our fathers, and praised and glorified is Thy name unto the ages. Amen.'),
      P('Holy God, Holy Mighty, Holy Immortal, have mercy on us.', 'Thrice'),
      R('The First Hour is joined to the end of Matins, and is read here.')
    ] }
],

typika: [
  { id:'typika-note', title:'The Divine Liturgy', by:'Why it is not printed in this book',
    body:[
      R('This page is explanation, not prayer.'),
      P('The Divine Liturgy is not a text a layman reads. It is offered by a bishop or priest with the people, and its center is the Eucharist itself, which cannot be kept privately or approximated at home. For that reason no prayer book prints it as something to be prayed alone, and this one does not either.'),
      P('What a layman does have is the Typika, given in full on the following page. It is the service appointed by the Church precisely for the times when the Liturgy is not served or cannot be attended \u2014 in a monastery without a priest, on a journey, in illness, in prison. It carries the shape of the Liturgy without its mystery.'),
      P('This is not a substitute in the sense of an equivalent. The Typika does not give you Communion, and reading it does not discharge the obligation to be in church. It is what the Church puts in your hands when you cannot be there, so that the hour is not left empty.'),
      H('Preparing to receive'),
      P('If you intend to commune, the Prayers Before Holy Communion are read the evening before, together with the Canon of Preparation, and one keeps the fast from midnight. Those prayers are lengthy and are not yet in this book; they are found in the prayer book, and their use is set with the blessing of your spiritual father.'),
      R('Of Thy Mystical Supper, O Son of God, accept me today as a communicant; for I will not speak of Thy Mystery to Thine enemies, neither like Judas will I give Thee a kiss; but like the thief will I confess Thee: Remember me, O Lord, in Thy Kingdom.')
    ] },
  { id:'typika', title:'The Typika', by:'Read when the Divine Liturgy cannot be attended',
    body:[].concat(TRISAGION, [
      H('Psalm 102'),
      V('Bless the Lord, O my soul, and all that is within me bless His holy name. Bless the Lord, O my soul, and forget not all that He hath done for thee: Who is gracious unto all thine iniquities, Who healeth all thine infirmities; Who redeemeth thy life from corruption, Who crowneth thee with mercy and compassion.'),
      V('Compassionate and merciful is the Lord, long-suffering and plenteous in mercy. Not according to our iniquities hath He dealt with us, neither according to our sins hath He rewarded us. For according to the height of heaven from the earth, so hath the Lord made His mercy to prevail over them that fear Him.'),
      V('As far as the east is from the west, so far hath He removed our iniquities from us. Like as a father hath compassion upon his sons, so hath the Lord had compassion upon them that fear Him; for He knoweth whereof we are made, He hath remembered that we are dust.'),
      P('Glory to the Father, and to the Son, and to the Holy Spirit.'),
      H('Psalm 145'),
      V('Praise the Lord, O my soul. I will praise the Lord in my life, I will chant unto my God for as long as I have my being. Trust ye not in princes, in the sons of men, in whom there is no salvation.'),
      V('Blessed is he of whom the God of Jacob is his help, whose hope is in the Lord his God, Who hath made heaven and the earth, the sea and all that is therein; Who keepeth truth unto eternity, Who executeth judgment for the wronged, Who giveth food unto the hungry. The Lord looseth the fettered; the Lord maketh wise the blind; the Lord setteth aright the fallen; the Lord loveth the righteous.'),
      P('Both now and ever, and unto the ages of ages. Amen.'),
      H('The Hymn of Justinian'),
      P('O Only-begotten Son and Word of God, Who art immortal, yet didst deign for our salvation to become incarnate of the holy Theotokos and Ever-Virgin Mary, and without change didst become man, and wast crucified, O Christ God, trampling down death by death; Thou Who art one of the Holy Trinity, glorified together with the Father and the Holy Spirit, save us.'),
      H('The Beatitudes'),
      R('At the first verse, say: Remember us, O Lord, when Thou comest in Thy Kingdom.'),
      P('Blessed are the poor in spirit, for theirs is the Kingdom of heaven. Blessed are they that mourn, for they shall be comforted. Blessed are the meek, for they shall inherit the earth. Blessed are they that hunger and thirst after righteousness, for they shall be filled.'),
      P('Blessed are the merciful, for they shall obtain mercy. Blessed are the pure in heart, for they shall see God. Blessed are the peacemakers, for they shall be called the sons of God. Blessed are they that are persecuted for righteousness\u2019 sake, for theirs is the Kingdom of heaven.'),
      P('Blessed are ye when men shall revile you and persecute you, and shall say all manner of evil against you falsely, for My sake. Rejoice and be exceeding glad, for great is your reward in the heavens.'),
      H('The Symbol of Faith'),
      P('I believe in one God, the Father Almighty, Maker of heaven and earth, and of all things visible and invisible. And in one Lord Jesus Christ, the Son of God, the Only-begotten, begotten of the Father before all ages; Light of Light, true God of true God; begotten, not made; of one essence with the Father, by Whom all things were made; Who for us men and for our salvation came down from the heavens, and was incarnate of the Holy Spirit and the Virgin Mary, and became man; and was crucified for us under Pontius Pilate, and suffered, and was buried; and arose again on the third day according to the Scriptures; and ascended into the heavens, and sitteth at the right hand of the Father; and shall come again with glory to judge the living and the dead, Whose kingdom shall have no end.'),
      P('And in the Holy Spirit, the Lord, the Giver of life, Who proceedeth from the Father; Who with the Father and the Son together is worshipped and glorified; Who spake by the prophets. In one Holy, Catholic and Apostolic Church. I confess one baptism for the remission of sins. I look for the resurrection of the dead, and the life of the age to come. Amen.'),
      H('The Lord\u2019s Prayer'),
      P('Our Father, Who art in the heavens, hallowed be Thy name. Thy kingdom come. Thy will be done, on earth as it is in heaven. Give us this day our daily bread, and forgive us our debts, as we forgive our debtors. And lead us not into temptation, but deliver us from the evil one.'),
      P('For Thine is the kingdom, and the power, and the glory, of the Father, and of the Son, and of the Holy Spirit, now and ever, and unto the ages of ages. Amen.'),
      H('Conclusion'),
      P('Lord, have mercy.', 'Twelve times'),
      V('I will bless the Lord at all times, His praise shall continually be in my mouth. In the Lord shall my soul be praised; let the meek hear and be glad. O magnify the Lord with me, and let us exalt His name together.'),
      P('Blessed be the name of the Lord, henceforth and forevermore.', 'Thrice'),
      P('Glory to the Father, and to the Son, and to the Holy Spirit, both now and ever, and unto the ages of ages. Amen.'),
      P('Through the prayers of our holy fathers, O Lord Jesus Christ our God, have mercy on us. Amen.')
    ]) }
],

/* ---------------- OCCASIONAL ---------------- */
occasional: [
  { id:'o-jesus', title:'The Jesus Prayer', by:'The prayer of the heart',
    body:[
      P('Lord Jesus Christ, Son of God, have mercy on me, a sinner.'),
      R('The shorter forms, for when the breath is short or the mind is scattered:'),
      P('Lord Jesus Christ, have mercy on me.'),
      P('Lord, have mercy.'),
      R('Say it slowly, with attention, without images. Return to it whenever the mind wanders. Use the counter on the home screen if it helps you keep a rule.')
    ] },
  { id:'o-meals', title:'Before and After Meals', by:'At the table',
    body:[
      H('Before the Meal'),
      P('Our Father, Who art in the heavens, hallowed be Thy name. Thy kingdom come. Thy will be done, on earth as it is in heaven. Give us this day our daily bread, and forgive us our debts, as we forgive our debtors. And lead us not into temptation, but deliver us from the evil one.'),
      P('Glory to the Father, and to the Son, and to the Holy Spirit, both now and ever, and unto the ages of ages. Amen. Lord, have mercy. Through the prayers of our holy fathers, O Lord Jesus Christ our God, have mercy on us. Amen.'),
      P('O Christ God, bless the food and drink of Thy servants, for Thou art holy always, now and ever, and unto the ages of ages. Amen.'),
      H('After the Meal'),
      P('We thank Thee, O Christ our God, that Thou hast satisfied us with Thine earthly good things. Deprive us not of Thy heavenly Kingdom, but as Thou camest among Thy disciples, O Saviour, and gavest them peace, come also to us and save us.'),
      P('It is truly meet to bless thee, the Theotokos, ever-blessed and most blameless, and the Mother of our God. More honorable than the Cherubim, and beyond compare more glorious than the Seraphim, who without corruption gavest birth to God the Word, the very Theotokos, thee do we magnify.')
    ] },
  { id:'o-travel', title:'Before Beginning Any Task', by:'And before setting out',
    body:[
      H('Before Any Undertaking'),
      P('O Lord Jesus Christ, Only-begotten Son of Thine Unoriginate Father, Thou hast said with Thy most pure lips that without Thee we can do nothing. My Lord, I embrace Thy words with faith in my soul and heart, and fall down before Thy goodness: help me, a sinner, to accomplish in Thee this work which I am beginning, in the name of the Father, and of the Son, and of the Holy Spirit, through the prayers of Thy most pure Mother and of all Thy saints. Amen.'),
      H('Before Setting Out on a Journey'),
      P('O Lord Jesus Christ our God, the true and living Way, Who wast pleased to journey with Thy foster-father Joseph and Thy most pure Virgin Mother into Egypt, and Who didst accompany Luke and Cleopas to Emmaus: we humbly entreat Thee, O most holy Master, by Thy grace accompany also us, Thy servants. Send an angel to be our guide and guardian, keeping us safe from every evil, and bring us in health and peace to the end of our journey. Amen.')
    ] }
]
};

/* ============================================================
   THE DAY'S WORD — deterministic rotation, works offline
   ============================================================ */
var WORD = [
  {v:'O God, my God, unto Thee I rise early at dawn. My soul hath thirsted for Thee.', r:'Psalm 62:1', s:'Prayer is the highest activity of the human spirit; it is at once supreme art and supreme achievement.', a:'St. Sophrony of Essex'},
  {v:'Be still, and know that I am God.', r:'Psalm 45:11', s:'Nothing is stronger than a soul that prays; it is not the many words but the attention of the heart that God receives.', a:'St. John Chrysostom'},
  {v:'Pray without ceasing. In everything give thanks.', r:'1 Thessalonians 5:17\u201318', s:'Acquire the Spirit of Peace, and thousands around you will be saved.', a:'St. Seraphim of Sarov'},
  {v:'Come unto Me, all ye that labor and are heavy laden, and I will give you rest.', r:'Matthew 11:28', s:'The Lord loves us so much that we cannot conceive of it, and it is by the Holy Spirit that we know this love.', a:'St. Silouan the Athonite'},
  {v:'Let my prayer be set forth as incense before Thee, the lifting up of my hands as an evening sacrifice.', r:'Psalm 140:2', s:'If you are a theologian, you will pray truly; and if you pray truly, you are a theologian.', a:'On Prayer, in the Philokalia'},
  {v:'Create in me a clean heart, O God, and renew a right spirit within me.', r:'Psalm 50:12', s:'A humble heart is the throne of simplicity, and the door to it is opened by tears.', a:'St. John Climacus'},
  {v:'Thy word is a lamp unto my feet, and a light unto my paths.', r:'Psalm 118:105', s:'Read the Gospel not merely with the mind, but with the whole of your life.', a:'St. Ignatius Brianchaninov'},
  {v:'Where two or three are gathered together in My name, there am I in the midst of them.', r:'Matthew 18:20', s:'No one can be saved alone; salvation is worked out in the Body.', a:'A saying of the Fathers'},
  {v:'I will bless the Lord at all times; His praise shall continually be in my mouth.', r:'Psalm 33:1', s:'Give thanks for everything, and God will forgive you everything.', a:'St. John Chrysostom'},
  {v:'The kingdom of God is within you.', r:'Luke 17:21', s:'Enter eagerly into the treasure house that is within you, and so you will see the things that are in heaven.', a:'St. Isaac the Syrian'},
  {v:'Lord, teach us to pray.', r:'Luke 11:1', s:'When you pray, do not try to feel anything; only stand before God with attention.', a:'St. Theophan the Recluse'},
  {v:'Cast thy care upon the Lord, and He shall nourish thee.', r:'Psalm 54:23', s:'Do not be troubled about tomorrow. The Lord Who cares for you today will care for you then also.', a:'The Elders of Optina'},
  {v:'This is the day which the Lord hath made; let us rejoice and be glad therein.', r:'Psalm 117:24', s:'Every day is a gift, and every hour a summons.', a:'A monastic saying'},
  {v:'Blessed are the pure in heart, for they shall see God.', r:'Matthew 5:8', s:'Purity of heart is not the absence of thoughts, but the refusal to entertain them.', a:'The Desert Fathers'},
  {v:'The light shineth in darkness, and the darkness comprehended it not.', r:'John 1:5', s:'God is a fire that warms and kindles the heart.', a:'St. Seraphim of Sarov'},
  {v:'Whom have I in heaven but Thee? And there is none upon earth that I desire beside Thee.', r:'Psalm 72:25', s:'My soul longeth for the Lord, and I seek Him with tears.', a:'St. Silouan the Athonite'},
  {v:'Watch ye therefore, for ye know neither the day nor the hour.', r:'Matthew 25:13', s:'Keep the remembrance of death before you, and you will not sin.', a:'St. Anthony the Great'},
  {v:'A broken and a humbled heart God will not despise.', r:'Psalm 50:19', s:'God does not ask for great deeds, but for a contrite heart.', a:'St. Poemen the Great'},
  {v:'Peace I leave with you, My peace I give unto you.', r:'John 14:27', s:'Keep your mind in hell, and despair not.', a:'St. Silouan the Athonite'},
  {v:'Bear ye one another\u2019s burdens, and so fulfil the law of Christ.', r:'Galatians 6:2', s:'If you have seen your brother, you have seen God.', a:'The Desert Fathers'},
  {v:'In the morning shall my prayer come before Thee.', r:'Psalm 87:14', s:'The morning belongs to God; give Him the first hour and He will bless the rest.', a:'A monastic saying'},
  {v:'Ask, and it shall be given you; seek, and ye shall find.', r:'Matthew 7:7', s:'God gives, but He waits to be asked, that we may learn that He is the Giver.', a:'Blessed Augustine of Hippo'},
  {v:'The Lord is my light and my saviour; whom then shall I fear?', r:'Psalm 26:1', s:'Fear nothing but sin, and even sin do not fear \u2014 repent of it.', a:'St. John of Kronstadt'},
  {v:'Love your enemies, bless them that curse you.', r:'Matthew 5:44', s:'The man who does not love his enemies does not know God.', a:'St. Silouan the Athonite'},
  {v:'Behold, I stand at the door and knock.', r:'Revelation 3:20', s:'God knocks quietly. Silence is required to hear it.', a:'A saying of the Fathers'},
  {v:'Not by works of righteousness which we have done, but according to His mercy He saved us.', r:'Titus 3:5', s:'Do not measure your progress; only keep beginning again.', a:'The Desert Fathers'},
  {v:'Take my yoke upon you, and learn of Me; for I am meek and lowly in heart.', r:'Matthew 11:29', s:'Humility is the garment of the Godhead.', a:'St. Isaac the Syrian'},
  {v:'Out of the depths have I cried unto Thee, O Lord.', r:'Psalm 129:1', s:'The depths are not a place of abandonment but the place where prayer becomes true.', a:'A saying of the Fathers'},
  {v:'His mercies are new every morning; great is Thy faithfulness.', r:'Lamentations 3:23', s:'Yesterday is buried in the mercy of God. Begin today.', a:'A monastic saying'},
  {v:'Abide in Me, and I in you.', r:'John 15:4', s:'The whole of the Christian life is learning to stay.', a:'A saying of the Fathers'},
  {v:'Blessed be the God and Father of our Lord Jesus Christ, the Father of mercies, and the God of all comfort.', r:'2 Corinthians 1:3', s:'Prayer is the breathing of the soul; prayer is our spiritual food and drink.', a:'St. John of Kronstadt'}
];


var CATS = {
  midnight:'Midnight Office', morning:'Morning Prayers', first:'First Hour', third:'Third Hour',
  sixth:'Sixth Hour', ninth:'Ninth Hour', evening:'Evening Prayers', compline:'Small Compline',
  theotokos:'To the Theotokos', angel:'To My Guardian Angel', silouan:'To St. Silouan',
  occasional:'Occasional Prayers', about:'The Shape of the Day', recenter:'Recenter',
  vespers:'Vespers', matins:'Matins', typika:'Divine Liturgy \u2014 the Typika'
};

var INTRO = {
  recenter:'Begin with whichever is nearest to your state. One prayer said slowly is worth more than all of them said quickly.'
};

PRAYERS.about = [
  { id:'about', title:'The Shape of the Day', by:'How this book is arranged, and why',
    body:[
      R('This page is explanation, not prayer.'),
      P('The liturgical day begins at sunset, not at midnight. This is why the Ninth Hour, though read in the afternoon, opens the evening group and belongs to the day that is beginning \u2014 and why the Church counts Saturday evening as the start of Sunday.'),
      P('The nine services of the daily cycle fall into three groups of three. The evening group is the Ninth Hour, Vespers and Compline. The morning group is the Midnight Office, Matins and the First Hour. The midday group is the Third Hour, the Sixth Hour and the Divine Liturgy \u2014 or, when there is no Liturgy, the Typika.'),
      P('Vespers, Matins and the Divine Liturgy are shown on the home screen but cannot be read here. Their texts change every day, drawing on the Octoechos, the Menaion, the Triodion and the Pentecostarion, and they are served in church rather than kept privately.'),
      H('The Hours in practice'),
      P('The Hours were appointed for the first, third, sixth and ninth hours counted from dawn \u2014 roughly six and nine in the morning, noon, and three in the afternoon. Monasteries still keep them at these times. In parish practice they are ordinarily joined to other services: the First Hour to the end of Matins, the Third and Sixth read together before the Liturgy, and the Ninth before Vespers.'),
      P('The psalms appointed are fixed. The First Hour reads Psalms 5, 89 and 100; the Third, Psalms 16, 24 and 50; the Sixth, Psalms 53, 54 and 90; the Ninth, Psalms 83, 84 and 85. The numbering is that of the Septuagint, which the Orthodox Church uses and which runs one behind the Hebrew numbering from Psalm 9 onward. The Hours here are given in the reader\u2019s abbreviated form, with representative verses standing in for the full psalms; the full text is found in the Psalter.'),
      H('The rule and the cycle are not the same thing'),
      P('The Morning and Evening Prayers are not services of the daily cycle. They are the rule of prayer kept at home by a layman, received from the prayer book, and they stand apart from the Hours for that reason. Neither replaces the other, and neither is a substitute for the services of the Church.'),
      P('The measure of a rule is not its length but its constancy, and it is set with the blessing of one\u2019s spiritual father, who knows what a given soul can bear.'),
      H('If this is new to you'),
      P('The rule comes first, and for most laymen it is the whole of it: the Morning Prayers, the Evening Prayers, a prayer before and after meals, and the Jesus Prayer through the day. That is a full Orthodox life of prayer. Nothing above it is owed.'),
      P('The services of the daily cycle are here so that you can see the shape of the Church\u2019s prayer and enter into it as you are able \u2014 the Sixth Hour at midday, the Typika on a Sunday you cannot get to church, Compline when the day has been long. They are an open door, not a list to be completed. No layman is expected to keep all eight, and the horarium they belong to is monastic.'),
      P('The counsel of the Fathers on this is consistent: a small rule kept faithfully is worth more than a large one taken up in zeal and abandoned in discouragement. Begin with less than you think you can manage, keep it, and let your spiritual father tell you when to add. A rule is set with his blessing, because he knows what a particular soul can bear and this book does not.'),
      H('On the texts'),
      P('The prayers here are given in the traditional English in which they are prayed across the Orthodox Church, in the customary order. Usages differ between churches in small things \u2014 the order of a prayer, the wording of a phrase, the reckoning of a fast \u2014 and where they do, your own parish is the measure. Where a prayer is a supplication composed in the traditional manner rather than a received text, that is stated on the page itself.')
    ] }
];


/* ============================================================
   THE DAY'S SHAPE
   ============================================================ */
/* The daily cycle as the Church orders it: the liturgical day begins at
   sunset, and the nine services fall into three groups of three.
   Vespers, Matins and the Liturgy are served in church and take their
   propers from the Octoechos and Menaion, so they are shown here for the
   sake of the shape of the day, but are not readable in this book. */
var CYCLE = [
  { label:'Evening \u2014 the day begins',
    note:'The liturgical day begins at sunset, not at midnight.',
    rows:[
      {key:'ninth',    name:'Ninth Hour',      time:'3 pm',        sub:'The death of the Lord',        from:14, to:17},
      {key:'vespers',  name:'Vespers',         time:'Sunset',      sub:'The lighting of the lamps'},
      {key:'compline', name:'Small Compline',  time:'Before bed',  sub:'The completion of the day',    from:21, to:24}
    ] },
  { label:'Night and morning',
    note:'In practice the First Hour is joined to the end of Matins.',
    rows:[
      {key:'midnight', name:'Midnight Office', time:'The night watch', sub:'Nocturns',                 from:0,  to:4},
      {key:'matins',   name:'Matins',          time:'Before dawn',  sub:'The day\u2019s first light'},
      {key:'first',    name:'First Hour',      time:'6 am',         sub:'Daybreak',                    from:6,  to:8}
    ] },
  { label:'Midday',
    note:'The Third and Sixth Hours are customarily read together.',
    rows:[
      {key:'third',    name:'Third Hour',      time:'9 am',         sub:'The Spirit upon the apostles', from:8,  to:11},
      {key:'sixth',    name:'Sixth Hour',      time:'12 noon',      sub:'The nailing to the Cross',     from:11, to:14},
      {key:'typika',   name:'Divine Liturgy',  time:'Midday',       sub:'And the Typika, read at home'}
    ] }
];

/* The layman's rule of prayer. These are not services of the daily cycle;
   they are the private rule kept at home, from the prayer book. */
var RULE = [
  {key:'morning', name:'Morning Prayers', time:'On rising',   sub:'Before all other things', from:4,  to:10},
  {key:'evening', name:'Evening Prayers', time:'Before sleep', sub:'The day laid to rest',   from:19, to:24}
];


/* ============================================================
   THE PATRON SAINT SLOT

   One intercession slot follows whatever name is set in Settings.
   Where a saint's own hymns are held in SAINT_LIB below, they are
   shown first; otherwise the general prayer alone is used, with the
   name substituted for (Name).

   To add a saint: add a lowercase key with the same block helpers.
   ============================================================ */

var SAINT_LIB = {
  silouan: PRAYERS.silouan,

  herman: [
    { id:'herman', title:'Troparion and Kontakion', by:'St. Herman of Alaska, \u20201837; glorified 1970',
      body:[
        H('Troparion, Tone 7'),
        P('O blessed Father Herman of Alaska, north star of Christ\u2019s holy Church: the light of thy life and great deeds guideth those who follow the Orthodox way. Together we lift high the Holy Cross thou didst plant firmly in America. Let all behold and glorify Jesus Christ, singing His holy Resurrection.'),
        H('Magnification'),
        P('We bless thee, O venerable Father Herman, and we honor thy holy memory, thou instructor of monastics and converser with the angels.'),
        R('The first saint glorified in North America, he lived on Spruce Island in Alaska, taught the Aleut people, and called himself the lowliest servant of these lands.')
      ] }
  ]
};

var PATRON_PRAYER = {
  id:'patron-prayer', title:'To My Patron Saint', by:'The saint whose name you bear',
  body:[
    P('Pray unto God for me, O holy saint (Name), for I fervently flee unto thee, the speedy helper and intercessor for my soul.'),
    H('Prayer'),
    P('O holy (Name), given me at holy baptism as my guardian and my namesake before God: I am unworthy to bear thy name, for thou didst run the race to its end, while I have scarcely begun; thou didst keep the faith, while I am inconstant in it.'),
    P('Yet thou dost not despise the one entrusted to thee. Stand for me before the throne of Christ our God. Ask for me the forgiveness of my sins, patience in what I must bear, and the mercy of God at the hour when I shall have nothing else to plead. Teach me by thine own example that what was possible for thee is possible also for me, since it is the same Lord Who worketh in us both.'),
    P('Through thy prayers, O holy (Name), and through the prayers of the most holy Theotokos, may Christ our God have mercy on me and save me. Amen.'),
    R('If your parish keeps the feast of your saint, that day is your name day; it is customary to commune, and to be greeted with the words: Many years.')
  ]
};

var PATRON_UNSET = {
  id:'patron-unset', title:'Your Patron Saint', by:'Not yet set',
  body:[
    R('Open Settings, by the cog on the Today screen, and enter the name of the saint you were given at baptism. The prayers on this page will then be said in his or her name, and the name will appear in your morning prayers also.'),
    P('Pray unto God for me, O holy saint, whose name I bear, for I fervently flee unto thee, the speedy helper and intercessor for my soul.'),
    R('If you do not know which saint you were named for, your priest will know, or it can be found from the day of your baptism in the calendar.')
  ]
};

PRAYERS.commem = [
  { id:'commem-litany', title:'The Commemoration', by:'From the litanies of the Church, with your own names',
    body:[
      R('The Church prays these petitions aloud at every Liturgy. What follows is the layman\u2019s form of them, with the names you have set in Settings. Read as much or as little as the day allows.'),
      P('In peace let us pray to the Lord. Lord, have mercy.'),
      H('For the Church'),
      P('Again we pray for our bishop (Bishop), for our father (Priest), for the honorable priesthood and the diaconate in Christ, for all the clergy and the people, and for the peace and welfare of the holy churches of God and the union of all: let us pray to the Lord. Lord, have mercy.'),
      P('For this holy house, and for them that enter it with faith, reverence and the fear of God, let us pray to the Lord. Lord, have mercy.'),
      H('For this land'),
      P('For this land, for its authorities and for all who serve in her defense, and for all who dwell therein: that we may lead a calm and peaceful life in all godliness and sanctity, let us pray to the Lord. Lord, have mercy.'),
      P('For seasonable weather, for abundance of the fruits of the earth, and for peaceful times, let us pray to the Lord. Lord, have mercy.'),
      H('For the living'),
      P('Again we pray for the servants of God (Living); for (Sponsor); and for my parents, my family and my kinsfolk, my friends and my enemies, for all who have asked my unworthy prayers, and for all Orthodox Christians: that the Lord may keep them in health and peace, and grant them His earthly and heavenly good things. Lord, have mercy.', 'Thrice'),
      H('For the suffering'),
      P('For those who are sick and who suffer; for those in prison and in captivity; for travelers by land, by sea and by air; for the hungry, the homeless, the widow and the orphan; for those who are alone and forgotten, and for those who have none to pray for them: let us pray to the Lord. Lord, have mercy.'),
      H('For what is on my heart'),
      R('The intentions set in Settings are read here.'),
      P('And we pray also for these things: (Intentions). O Lord, Thou knowest what is needful before we ask; grant what is profitable for our salvation, and where my asking is amiss, do Thou answer as Thou knowest best. Lord, have mercy.'),
      H('For the departed'),
      P('Again we pray for the repose of the souls of the departed servants of God (Departed); and of all Orthodox Christians who have fallen asleep in the hope of the resurrection unto life eternal. Forgive them every transgression, voluntary and involuntary, and grant them the Kingdom and the communion of Thine eternal good things, and the enjoyment of Thine endless and blessed life. Lord, have mercy.', 'Thrice'),
      P('Memory eternal.', 'Thrice'),
      H('Conclusion'),
      P('For Thou art a merciful God Who lovest mankind, and unto Thee do we send up glory: to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto the ages of ages. Amen.'),
      R('Names may also be given to your priest for commemoration at the Liturgy, where they are remembered at the altar. That is of greater profit to the living and the departed alike than anything said at home.')
    ] }
];

PRAYERS.patron = [PATRON_UNSET];          // rebuilt on every render
CATS.patron = 'My Patron Saint';
CATS.commem = 'The Commemoration';

/* ============================================================
   HOLY COMMUNION
   ============================================================ */
PRAYERS.communion = [
  { id:'comm-before', title:'Before Holy Communion', by:'Read the evening before, or the morning of',
    body:[
      R('The full preparation is the Canon of Preparation and the Akathist, read the evening before, together with the prayers below; one keeps the fast from midnight, and comes having been to confession as your spiritual father directs. What follows are the prayers themselves. Do not approach the Chalice without your priest\u2019s blessing.'),
      P('O Lord my God, I know that I am not worthy nor sufficient that Thou shouldst enter under the roof of the house of my soul, for it is all deserted and in ruins, and Thou hast not in me a place worthy to lay Thy head. But as Thou didst humble Thyself from on high for our sake, so now humble Thyself to my lowliness. And as Thou didst consent to lie in a cave and in a manger of dumb beasts, so also consent to enter into the manger of mine unspiritual soul and into my defiled body.'),
      P('And as Thou didst not disdain to enter and to sup with sinners in the house of Simon the leper, so consent also to enter the house of my lowly soul, leprous and sinful. And as Thou didst not cast out the sinful woman who came and touched Thee, so also have compassion on me, a sinner, who come and touch Thee. And grant that I may partake of Thine all-holy Body and precious Blood for the sanctification, enlightenment and strengthening of my lowly soul and body, unto the relief of the burden of my many sins, unto my preservation from every diabolical practice, and unto the amendment and establishment of my humble and wretched life. Amen.'),
      H('Prayer of St. Basil the Great'),
      P('O Master Lord Jesus Christ our God, Who alone hast authority to forgive men their sins: as Thou art good and lovest mankind, overlook all mine offenses, whether committed with knowledge or in ignorance; and vouchsafe me to partake without condemnation of Thy divine, most glorious, immaculate and life-giving Mysteries, not unto punishment, nor unto an increase of sins, but unto purification and sanctification, and as a pledge of the life and kingdom to come, as a protection, a help, and a repelling of adversaries, and for the blotting out of my many transgressions.'),
      P('For Thou art a God of mercy and compassion and love for mankind, and unto Thee do we send up glory, together with the Father and the Holy Spirit, now and ever, and unto the ages of ages. Amen.'),
      H('Approaching the Chalice'),
      R('When the priest comes forth with the Chalice, bow, cross your arms upon your breast, and say your baptismal name clearly. Then:'),
      P('I believe, O Lord, and I confess that Thou art truly the Christ, the Son of the living God, Who camest into the world to save sinners, of whom I am first. I believe also that this is truly Thine own most pure Body, and that this is truly Thine own precious Blood.'),
      P('Wherefore I pray Thee: have mercy on me and forgive my transgressions, both voluntary and involuntary, of word and of deed, committed in knowledge and in ignorance; and vouchsafe me to partake without condemnation of Thine immaculate Mysteries, unto the remission of sins and unto life everlasting. Amen.'),
      P('Of Thy Mystical Supper, O Son of God, accept me today as a communicant; for I will not speak of Thy Mystery to Thine enemies, neither like Judas will I give Thee a kiss; but like the thief will I confess Thee: Remember me, O Lord, in Thy Kingdom.'),
      P('Let not the communion of Thy Holy Mysteries be unto me for judgment or condemnation, O Lord, but for the healing of soul and body. Amen.')
    ] },

  { id:'comm-after', title:'Thanksgiving After Communion', by:'Read at once, before any other thing',
    body:[
      R('Having communed, do not hurry away. These are read after the Liturgy, before the day resumes.'),
      P('Glory to Thee, O God. Glory to Thee, O God. Glory to Thee, O God.'),
      H('Prayer of Thanksgiving'),
      P('I thank Thee, O Lord my God, that Thou hast not rejected me, a sinner, but hast vouchsafed me to be a communicant of Thy Holy Things. I thank Thee that Thou hast vouchsafed me, the unworthy, to partake of Thy most pure and heavenly Gifts.'),
      P('But, O Master, Lover of mankind, Who didst die and rise again for our sake, and didst bestow upon us these dread and life-giving Mysteries for the well-being and sanctification of our souls and bodies: grant that these may be even unto me for the healing of soul and body, for the averting of everything hostile, for the enlightenment of the eyes of my heart, for the peace of the powers of my soul, for faith unashamed, for love unfeigned, for the fullness of wisdom, for the keeping of Thy commandments, for an increase of Thy divine grace, and for the attainment of Thy Kingdom.'),
      P('That being preserved by them in Thy holiness, I may ever be mindful of Thy grace, and no longer live for myself but for Thee, our Master and Benefactor. And thus, when I have departed this life in the hope of life eternal, may I attain unto the everlasting rest, where the sound of them that keep festival is unceasing, and the delight of them that behold the ineffable beauty of Thy countenance is unending. For Thou art the true desire and the unutterable gladness of them that love Thee, O Christ our God, and all creation doth hymn Thee unto the ages. Amen.'),
      H('Prayer of St. Basil the Great'),
      P('O Master Christ God, King of the ages and Creator of all things: I thank Thee for all the good things which Thou hast given me, and for the communion of Thy most pure and life-giving Mysteries. I pray Thee, therefore, O Good One and Lover of mankind: keep me under Thy protection and in the shadow of Thy wings; and grant me, even until my last breath, to partake worthily and with a pure conscience of Thy Holy Things, unto the remission of sins and unto life eternal.'),
      P('For Thou art the Bread of life, the Source of holiness, the Giver of good things, and unto Thee do we send up glory, together with the Father and the Holy Spirit, now and ever, and unto the ages of ages. Amen.'),
      H('Prayer to the Most Holy Theotokos'),
      P('O most holy Lady Theotokos, light of my darkened soul, my hope, my shelter, my refuge, my consolation and my joy: I thank thee that thou hast vouchsafed me, who am unworthy, to be a partaker of the most pure Body and precious Blood of thy Son.'),
      P('Do thou who gavest birth to the true Light enlighten the spiritual eyes of my heart. Thou who bore the Source of immortality, quicken me who am dead in sin. Thou who art the loving Mother of the merciful God, have mercy on me, and grant me compunction and contrition of heart, humility in my thoughts, and the recall of my reasonings from captivity. And vouchsafe me until my last breath to receive without condemnation the sanctification of the most pure Mysteries, unto the healing of soul and body. Amen.'),
      P('Now lettest Thou Thy servant depart in peace, O Master, according to Thy word; for mine eyes have seen Thy salvation, which Thou hast prepared before the face of all peoples: a light of revelation for the Gentiles, and the glory of Thy people Israel.'),
      R('Glory to God for all things.')
    ] }
];
CATS.communion = 'Holy Communion';
INTRO.communion = 'Approach only with the blessing of your spiritual father.';

/* Added to the occasional prayers */
PRAYERS.occasional.push(
  { id:'o-sick', title:'For the Sick', by:'For another, or for oneself',
    body:[
      P('O Lord Almighty, Physician of our souls and bodies, Who dost cast down and raise up, chastise and heal also: do Thou now in Thy great mercy visit Thy servants who are sick, and stretch forth Thine arm which is full of healing and health.'),
      P('Raise them up from their bed and from their couch of affliction, and grant them health and soundness, that they may live to serve Thee. Turn their sickness into health, and their sorrow into gladness; and if it be Thy will to take them to Thyself, grant them a Christian ending to their life, painless, blameless and peaceful, and a good defense before Thy dread judgment seat.'),
      P('For Thou art the Fountain of healing, O God our God, and unto Thee do we send up glory, to the Father, and to the Son, and to the Holy Spirit, now and ever, and unto the ages of ages. Amen.'),
      R('The Church also has the Mystery of Holy Unction for the sick. Ask your priest; a prayer at home does not take its place.')
    ] },
  { id:'o-forgive', title:'For Those Who Have Wronged Me', by:'And for those I have wronged',
    body:[
      R('Hard to say, and the more necessary for that.'),
      P('O Lord Jesus Christ, Who didst pray for them that crucified Thee: forgive those who have wronged me, and forgive me who have wronged others. Take from my heart all bitterness, all keeping of accounts, and all desire that they should suffer for what they have done.'),
      P('I cannot yet feel what I am saying; grant that the words may go before the heart, and that the heart may follow after. Bless those who have grieved me, and do them good, and save them. And where I am the one at fault, give me the plainness of speech to say so, without excuse and without delay.'),
      P('For Thou hast said that if we forgive not men their trespasses, neither will our Father forgive us ours. Amen.')
    ] }
);

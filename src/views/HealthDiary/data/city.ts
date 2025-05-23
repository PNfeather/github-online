const cityColumns = [
  {
    text: '北京市',
    value: 'Beijing',
    children: [
      {
        value: '101010100',
        text: '北京市',
      },
    ],
  },
  {
    text: '上海市',
    value: 'Shanghai',
    children: [
      {
        value: '101020100',
        text: '上海市',
      },
    ],
  },
  {
    text: '天津市',
    value: 'Tianjin',
    children: [
      {
        value: '101030100',
        text: '天津市',
      },
    ],
  },
  {
    text: '重庆市',
    value: 'Chongqing',
    children: [
      {
        value: '101040100',
        text: '重庆市',
      },
    ],
  },
  {
    text: '黑龙江省',
    value: 'Heilongjiang',
    children: [
      {
        value: '101050101',
        text: '哈尔滨市',
      },
      {
        value: '101050201',
        text: '齐齐哈尔市',
      },
      {
        value: '101050301',
        text: '牡丹江市',
      },
      {
        value: '101050401',
        text: '佳木斯市',
      },
      {
        value: '101050501',
        text: '绥化市',
      },
      {
        value: '101050601',
        text: '黑河市',
      },
      {
        value: '101050701',
        text: '大兴安岭地区',
      },
      {
        value: '101050801',
        text: '伊春市',
      },
      {
        value: '101050901',
        text: '大庆市',
      },
      {
        value: '101051001',
        text: '七台河市',
      },
      {
        value: '101051101',
        text: '鸡西市',
      },
      {
        value: '101051201',
        text: '鹤岗市',
      },
      {
        value: '101051301',
        text: '双鸭山市',
      },
    ],
  },
  {
    text: '吉林省',
    value: 'Jilin',
    children: [
      {
        value: '101060101',
        text: '长春市',
      },
      {
        value: '101060201',
        text: '吉林市',
      },
      {
        value: '101060301',
        text: '延边朝鲜族自治州',
      },
      {
        value: '101060401',
        text: '四平市',
      },
      {
        value: '101060501',
        text: '通化市',
      },
      {
        value: '101060601',
        text: '白城市',
      },
      {
        value: '101060701',
        text: '辽源市',
      },
      {
        value: '101060801',
        text: '松原市',
      },
      {
        value: '101060901',
        text: '白山市',
      },
    ],
  },
  {
    text: '辽宁省',
    value: 'Liaoning',
    children: [
      {
        value: '101070101',
        text: '沈阳市',
      },
      {
        value: '101070201',
        text: '大连市',
      },
      {
        value: '101070301',
        text: '鞍山市',
      },
      {
        value: '101070401',
        text: '抚顺市',
      },
      {
        value: '101070501',
        text: '本溪市',
      },
      {
        value: '101070601',
        text: '丹东市',
      },
      {
        value: '101070701',
        text: '锦州市',
      },
      {
        value: '101070801',
        text: '营口市',
      },
      {
        value: '101070901',
        text: '阜新市',
      },
      {
        value: '101071001',
        text: '辽阳市',
      },
      {
        value: '101071101',
        text: '铁岭市',
      },
      {
        value: '101071201',
        text: '朝阳市',
      },
      {
        value: '101071301',
        text: '盘锦市',
      },
      {
        value: '101071401',
        text: '葫芦岛市',
      },
    ],
  },
  {
    text: '内蒙古自治区',
    value: 'Inner-Mongolia-Autonomous-Region',
    children: [
      {
        value: '101080101',
        text: '呼和浩特市',
      },
      {
        value: '101080201',
        text: '包头市',
      },
      {
        value: '101080301',
        text: '乌海市',
      },
      {
        value: '101080401',
        text: '乌兰察布市',
      },
      {
        value: '101080501',
        text: '通辽市',
      },
      {
        value: '101080601',
        text: '赤峰市',
      },
      {
        value: '101080701',
        text: '鄂尔多斯市',
      },
      {
        value: '101080801',
        text: '巴彦淖尔市',
      },
      {
        value: '101080901',
        text: '锡林郭勒盟',
      },
      {
        value: '101081001',
        text: '呼伦贝尔市',
      },
      {
        value: '101081101',
        text: '兴安盟',
      },
      {
        value: '101081201',
        text: '阿拉善盟',
      },
    ],
  },
  {
    text: '河北省',
    value: 'Hebei',
    children: [
      {
        value: '101090101',
        text: '石家庄市',
      },
      {
        value: '101090201',
        text: '保定市',
      },
      {
        value: '101090301',
        text: '张家口市',
      },
      {
        value: '101090401',
        text: '承德市',
      },
      {
        value: '101090501',
        text: '唐山市',
      },
      {
        value: '101090601',
        text: '廊坊市',
      },
      {
        value: '101090701',
        text: '沧州市',
      },
      {
        value: '101090801',
        text: '衡水市',
      },
      {
        value: '101090901',
        text: '邢台市',
      },
      {
        value: '101091001',
        text: '邯郸市',
      },
      {
        value: '101091101',
        text: '秦皇岛市',
      },
      {
        value: '101091201',
        text: '雄安新区',
      },
    ],
  },
  {
    text: '山西省',
    value: 'Shanxi',
    children: [
      {
        value: '101100101',
        text: '太原市',
      },
      {
        value: '101100201',
        text: '大同市',
      },
      {
        value: '101100301',
        text: '阳泉市',
      },
      {
        value: '101100401',
        text: '晋中市',
      },
      {
        value: '101100501',
        text: '长治市',
      },
      {
        value: '101100601',
        text: '晋城市',
      },
      {
        value: '101100701',
        text: '临汾市',
      },
      {
        value: '101100801',
        text: '运城市',
      },
      {
        value: '101100901',
        text: '朔州市',
      },
      {
        value: '101101001',
        text: '忻州市',
      },
      {
        value: '101101100',
        text: '吕梁市',
      },
    ],
  },
  {
    text: '陕西省',
    value: 'Shaanxi',
    children: [
      {
        value: '101110101',
        text: '西安市',
      },
      {
        value: '101110200',
        text: '咸阳市',
      },
      {
        value: '101110300',
        text: '延安市',
      },
      {
        value: '101110401',
        text: '榆林市',
      },
      {
        value: '101110501',
        text: '渭南市',
      },
      {
        value: '101110601',
        text: '商洛市',
      },
      {
        value: '101110701',
        text: '安康市',
      },
      {
        value: '101110801',
        text: '汉中市',
      },
      {
        value: '101110901',
        text: '宝鸡市',
      },
      {
        value: '101111001',
        text: '铜川市',
      },
    ],
  },
  {
    text: '山东省',
    value: 'Shandong',
    children: [
      {
        value: '101120101',
        text: '济南市',
      },
      {
        value: '101120201',
        text: '青岛市',
      },
      {
        value: '101120301',
        text: '淄博市',
      },
      {
        value: '101120401',
        text: '德州市',
      },
      {
        value: '101120501',
        text: '烟台市',
      },
      {
        value: '101120601',
        text: '潍坊市',
      },
      {
        value: '101120701',
        text: '济宁市',
      },
      {
        value: '101120801',
        text: '泰安市',
      },
      {
        value: '101120901',
        text: '临沂市',
      },
      {
        value: '101121001',
        text: '菏泽市',
      },
      {
        value: '101121101',
        text: '滨州市',
      },
      {
        value: '101121201',
        text: '东营市',
      },
      {
        value: '101121301',
        text: '威海市',
      },
      {
        value: '101121401',
        text: '枣庄市',
      },
      {
        value: '101121501',
        text: '日照市',
      },
      {
        value: '101121701',
        text: '聊城市',
      },
    ],
  },
  {
    text: '新疆维吾尔自治区',
    value: 'Xinjiang-Uygur-Autonomous-Region',
    children: [
      {
        value: '101130101',
        text: '乌鲁木齐市',
      },
      {
        value: '101130201',
        text: '克拉玛依市',
      },
      {
        value: '101130301',
        text: '石河子市',
      },
      {
        value: '101130401',
        text: '昌吉回族自治州',
      },
      {
        value: '101130501',
        text: '吐鲁番市',
      },
      {
        value: '101130601',
        text: '巴音郭楞蒙古自治州',
      },
      {
        value: '101130701',
        text: '阿拉尔市',
      },
      {
        value: '101130801',
        text: '阿克苏地区',
      },
      {
        value: '101130901',
        text: '喀什地区',
      },
      {
        value: '101131001',
        text: '伊犁哈萨克自治州',
      },
      {
        value: '101131101',
        text: '塔城地区',
      },
      {
        value: '101131201',
        text: '哈密市',
      },
      {
        value: '101131301',
        text: '和田地区',
      },
      {
        value: '101131401',
        text: '阿勒泰地区',
      },
      {
        value: '101131501',
        text: '克孜勒苏柯尔克孜自治州',
      },
      {
        value: '101131601',
        text: '博尔塔拉蒙古自治州',
      },
      {
        value: '101131701',
        text: '图木舒克市',
      },
      {
        value: '101131801',
        text: '五家渠市',
      },
      {
        value: '101131901',
        text: '铁门关市',
      },
      {
        value: '101131920',
        text: '昆玉市',
      },
      {
        value: '101132101',
        text: '北屯市',
      },
      {
        value: '101132201',
        text: '双河市',
      },
      {
        value: '101132301',
        text: '可克达拉市',
      },
      {
        value: '101132401',
        text: '胡杨河市',
      },
      {
        value: '101132501',
        text: '新星市',
      },
    ],
  },
  {
    text: '西藏自治区',
    value: 'Tibet-Autonomous-Region',
    children: [
      {
        value: '101140101',
        text: '拉萨市',
      },
      {
        value: '101140201',
        text: '日喀则市',
      },
      {
        value: '101140301',
        text: '山南市',
      },
      {
        value: '101140401',
        text: '林芝市',
      },
      {
        value: '101140501',
        text: '昌都市',
      },
      {
        value: '101140601',
        text: '那曲市',
      },
      {
        value: '101140701',
        text: '阿里地区',
      },
    ],
  },
  {
    text: '青海省',
    value: 'Qinghai',
    children: [
      {
        value: '101150101',
        text: '西宁市',
      },
      {
        value: '101150201',
        text: '海东市',
      },
      {
        value: '101150301',
        text: '黄南藏族自治州',
      },
      {
        value: '101150401',
        text: '海南藏族自治州',
      },
      {
        value: '101150501',
        text: '果洛藏族自治州',
      },
      {
        value: '101150601',
        text: '玉树藏族自治州',
      },
      {
        value: '101150701',
        text: '海西蒙古族藏族自治州',
      },
      {
        value: '101150801',
        text: '海北藏族自治州',
      },
    ],
  },
  {
    text: '甘肃省',
    value: 'Gansu',
    children: [
      {
        value: '101160101',
        text: '兰州市',
      },
      {
        value: '101160201',
        text: '定西市',
      },
      {
        value: '101160301',
        text: '平凉市',
      },
      {
        value: '101160401',
        text: '庆阳市',
      },
      {
        value: '101160501',
        text: '武威市',
      },
      {
        value: '101160601',
        text: '金昌市',
      },
      {
        value: '101160701',
        text: '张掖市',
      },
      {
        value: '101160801',
        text: '酒泉市',
      },
      {
        value: '101160901',
        text: '天水市',
      },
      {
        value: '101161001',
        text: '陇南市',
      },
      {
        value: '101161101',
        text: '临夏回族自治州',
      },
      {
        value: '101161201',
        text: '甘南藏族自治州',
      },
      {
        value: '101161301',
        text: '白银市',
      },
      {
        value: '101161401',
        text: '嘉峪关市',
      },
    ],
  },
  {
    text: '宁夏回族自治区',
    value: 'Ningxia-Hui-Autonomous-Region',
    children: [
      {
        value: '101170101',
        text: '银川市',
      },
      {
        value: '101170201',
        text: '石嘴山市',
      },
      {
        value: '101170301',
        text: '吴忠市',
      },
      {
        value: '101170401',
        text: '固原市',
      },
      {
        value: '101170501',
        text: '中卫市',
      },
    ],
  },
  {
    text: '河南省',
    value: 'Henan',
    children: [
      {
        value: '101180101',
        text: '郑州市',
      },
      {
        value: '101180201',
        text: '安阳市',
      },
      {
        value: '101180301',
        text: '新乡市',
      },
      {
        value: '101180401',
        text: '许昌市',
      },
      {
        value: '101180501',
        text: '平顶山市',
      },
      {
        value: '101180601',
        text: '信阳市',
      },
      {
        value: '101180701',
        text: '南阳市',
      },
      {
        value: '101180801',
        text: '开封市',
      },
      {
        value: '101180901',
        text: '洛阳市',
      },
      {
        value: '101181001',
        text: '商丘市',
      },
      {
        value: '101181101',
        text: '焦作市',
      },
      {
        value: '101181201',
        text: '鹤壁市',
      },
      {
        value: '101181301',
        text: '濮阳市',
      },
      {
        value: '101181401',
        text: '周口市',
      },
      {
        value: '101181501',
        text: '漯河市',
      },
      {
        value: '101181601',
        text: '驻马店市',
      },
      {
        value: '101181701',
        text: '三门峡市',
      },
      {
        value: '101181801',
        text: '济源市',
      },
    ],
  },
  {
    text: '江苏省',
    value: 'Jiangsu',
    children: [
      {
        value: '101190101',
        text: '南京市',
      },
      {
        value: '101190201',
        text: '无锡市',
      },
      {
        value: '101190301',
        text: '镇江市',
      },
      {
        value: '101190401',
        text: '苏州市',
      },
      {
        value: '101190501',
        text: '南通市',
      },
      {
        value: '101190601',
        text: '扬州市',
      },
      {
        value: '101190701',
        text: '盐城市',
      },
      {
        value: '101190801',
        text: '徐州市',
      },
      {
        value: '101190901',
        text: '淮安市',
      },
      {
        value: '101191001',
        text: '连云港市',
      },
      {
        value: '101191101',
        text: '常州市',
      },
      {
        value: '101191201',
        text: '泰州市',
      },
      {
        value: '101191301',
        text: '宿迁市',
      },
    ],
  },
  {
    text: '湖北省',
    value: 'Hubei',
    children: [
      {
        value: '101200101',
        text: '武汉市',
      },
      {
        value: '101200201',
        text: '襄阳市',
      },
      {
        value: '101200301',
        text: '鄂州市',
      },
      {
        value: '101200401',
        text: '孝感市',
      },
      {
        value: '101200501',
        text: '黄冈市',
      },
      {
        value: '101200601',
        text: '黄石市',
      },
      {
        value: '101200701',
        text: '咸宁市',
      },
      {
        value: '101200801',
        text: '荆州市',
      },
      {
        value: '101200901',
        text: '宜昌市',
      },
      {
        value: '101201001',
        text: '恩施土家族苗族自治州',
      },
      {
        value: '101201101',
        text: '十堰市',
      },
      {
        value: '101201201',
        text: '神农架林区',
      },
      {
        value: '101201301',
        text: '随州市',
      },
      {
        value: '101201401',
        text: '荆门市',
      },
      {
        value: '101201501',
        text: '天门市',
      },
      {
        value: '101201601',
        text: '仙桃市',
      },
      {
        value: '101201701',
        text: '潜江市',
      },
    ],
  },
  {
    text: '浙江省',
    value: 'Zhejiang',
    children: [
      {
        value: '101210101',
        text: '杭州市',
      },
      {
        value: '101210201',
        text: '湖州市',
      },
      {
        value: '101210301',
        text: '嘉兴市',
      },
      {
        value: '101210401',
        text: '宁波市',
      },
      {
        value: '101210501',
        text: '绍兴市',
      },
      {
        value: '101210601',
        text: '台州市',
      },
      {
        value: '101210701',
        text: '温州市',
      },
      {
        value: '101210801',
        text: '丽水市',
      },
      {
        value: '101210901',
        text: '金华市',
      },
      {
        value: '101211001',
        text: '衢州市',
      },
      {
        value: '101211101',
        text: '舟山市',
      },
    ],
  },
  {
    text: '安徽省',
    value: 'Anhui',
    children: [
      {
        value: '101220101',
        text: '合肥市',
      },
      {
        value: '101220201',
        text: '蚌埠市',
      },
      {
        value: '101220301',
        text: '芜湖市',
      },
      {
        value: '101220401',
        text: '淮南市',
      },
      {
        value: '101220501',
        text: '马鞍山市',
      },
      {
        value: '101220601',
        text: '安庆市',
      },
      {
        value: '101220701',
        text: '宿州市',
      },
      {
        value: '101220801',
        text: '阜阳市',
      },
      {
        value: '101220901',
        text: '亳州市',
      },
      {
        value: '101221001',
        text: '黄山市',
      },
      {
        value: '101221101',
        text: '滁州市',
      },
      {
        value: '101221201',
        text: '淮北市',
      },
      {
        value: '101221301',
        text: '铜陵市',
      },
      {
        value: '101221401',
        text: '宣城市',
      },
      {
        value: '101221501',
        text: '六安市',
      },
      {
        value: '101221701',
        text: '池州市',
      },
    ],
  },
  {
    text: '福建省',
    value: 'Fujian',
    children: [
      {
        value: '101230101',
        text: '福州市',
      },
      {
        value: '101230201',
        text: '厦门市',
      },
      {
        value: '101230301',
        text: '宁德市',
      },
      {
        value: '101230401',
        text: '莆田市',
      },
      {
        value: '101230501',
        text: '泉州市',
      },
      {
        value: '101230601',
        text: '漳州市',
      },
      {
        value: '101230701',
        text: '龙岩市',
      },
      {
        value: '101230801',
        text: '三明市',
      },
      {
        value: '101230901',
        text: '南平市',
      },
    ],
  },
  {
    text: '江西省',
    value: 'Jiangxi',
    children: [
      {
        value: '101240101',
        text: '南昌市',
      },
      {
        value: '101240201',
        text: '九江市',
      },
      {
        value: '101240301',
        text: '上饶市',
      },
      {
        value: '101240401',
        text: '抚州市',
      },
      {
        value: '101240501',
        text: '宜春市',
      },
      {
        value: '101240601',
        text: '吉安市',
      },
      {
        value: '101240701',
        text: '赣州市',
      },
      {
        value: '101240801',
        text: '景德镇市',
      },
      {
        value: '101240901',
        text: '萍乡市',
      },
      {
        value: '101241001',
        text: '新余市',
      },
      {
        value: '101241101',
        text: '鹰潭市',
      },
    ],
  },
  {
    text: '湖南省',
    value: 'Hunan',
    children: [
      {
        value: '101250101',
        text: '长沙市',
      },
      {
        value: '101250201',
        text: '湘潭市',
      },
      {
        value: '101250301',
        text: '株洲市',
      },
      {
        value: '101250401',
        text: '衡阳市',
      },
      {
        value: '101250501',
        text: '郴州市',
      },
      {
        value: '101250601',
        text: '常德市',
      },
      {
        value: '101250700',
        text: '益阳市',
      },
      {
        value: '101250801',
        text: '娄底市',
      },
      {
        value: '101250901',
        text: '邵阳市',
      },
      {
        value: '101251001',
        text: '岳阳市',
      },
      {
        value: '101251101',
        text: '张家界市',
      },
      {
        value: '101251201',
        text: '怀化市',
      },
      {
        value: '101251401',
        text: '永州市',
      },
      {
        value: '101251501',
        text: '湘西土家族苗族自治州',
      },
    ],
  },
  {
    text: '贵州省',
    value: 'Guizhou',
    children: [
      {
        value: '101260101',
        text: '贵阳市',
      },
      {
        value: '101260201',
        text: '遵义市',
      },
      {
        value: '101260301',
        text: '安顺市',
      },
      {
        value: '101260401',
        text: '黔南布依族苗族自治州',
      },
      {
        value: '101260501',
        text: '黔东南苗族侗族自治州',
      },
      {
        value: '101260601',
        text: '铜仁市',
      },
      {
        value: '101260701',
        text: '毕节市',
      },
      {
        value: '101260801',
        text: '六盘水市',
      },
      {
        value: '101260901',
        text: '黔西南布依族苗族自治州',
      },
    ],
  },
  {
    text: '四川省',
    value: 'Sichuan',
    children: [
      {
        value: '101270101',
        text: '成都市',
      },
      {
        value: '101270201',
        text: '攀枝花市',
      },
      {
        value: '101270301',
        text: '自贡市',
      },
      {
        value: '101270401',
        text: '绵阳市',
      },
      {
        value: '101270501',
        text: '南充市',
      },
      {
        value: '101270601',
        text: '达州市',
      },
      {
        value: '101270701',
        text: '遂宁市',
      },
      {
        value: '101270801',
        text: '广安市',
      },
      {
        value: '101270901',
        text: '巴中市',
      },
      {
        value: '101271001',
        text: '泸州市',
      },
      {
        value: '101271101',
        text: '宜宾市',
      },
      {
        value: '101271201',
        text: '内江市',
      },
      {
        value: '101271301',
        text: '资阳市',
      },
      {
        value: '101271401',
        text: '乐山市',
      },
      {
        value: '101271501',
        text: '眉山市',
      },
      {
        value: '101271601',
        text: '凉山彝族自治州',
      },
      {
        value: '101271701',
        text: '雅安市',
      },
      {
        value: '101271801',
        text: '甘孜藏族自治州',
      },
      {
        value: '101271901',
        text: '阿坝藏族羌族自治州',
      },
      {
        value: '101272001',
        text: '德阳市',
      },
      {
        value: '101272101',
        text: '广元市',
      },
    ],
  },
  {
    text: '广东省',
    value: 'Guangdong',
    children: [
      {
        value: '101280101',
        text: '广州市',
      },
      {
        value: '101280201',
        text: '韶关市',
      },
      {
        value: '101280301',
        text: '惠州市',
      },
      {
        value: '101280401',
        text: '梅州市',
      },
      {
        value: '101280501',
        text: '汕头市',
      },
      {
        value: '101280601',
        text: '深圳市',
      },
      {
        value: '101280701',
        text: '珠海市',
      },
      {
        value: '101280800',
        text: '佛山市',
      },
      {
        value: '101280901',
        text: '肇庆市',
      },
      {
        value: '101281001',
        text: '湛江市',
      },
      {
        value: '101281101',
        text: '江门市',
      },
      {
        value: '101281201',
        text: '河源市',
      },
      {
        value: '101281301',
        text: '清远市',
      },
      {
        value: '101281401',
        text: '云浮市',
      },
      {
        value: '101281501',
        text: '潮州市',
      },
      {
        value: '101281601',
        text: '东莞市',
      },
      {
        value: '101281701',
        text: '中山市',
      },
      {
        value: '101281801',
        text: '阳江市',
      },
      {
        value: '101281901',
        text: '揭阳市',
      },
      {
        value: '101282001',
        text: '茂名市',
      },
      {
        value: '101282101',
        text: '汕尾市',
      },
    ],
  },
  {
    text: '云南省',
    value: 'Yunnan',
    children: [
      {
        value: '101290101',
        text: '昆明市',
      },
      {
        value: '101290201',
        text: '大理白族自治州',
      },
      {
        value: '101290301',
        text: '红河哈尼族彝族自治州',
      },
      {
        value: '101290401',
        text: '曲靖市',
      },
      {
        value: '101290501',
        text: '保山市',
      },
      {
        value: '101290601',
        text: '文山壮族苗族自治州',
      },
      {
        value: '101290701',
        text: '玉溪市',
      },
      {
        value: '101290801',
        text: '楚雄彝族自治州',
      },
      {
        value: '101290901',
        text: '普洱市',
      },
      {
        value: '101291001',
        text: '昭通市',
      },
      {
        value: '101291101',
        text: '临沧市',
      },
      {
        value: '101291201',
        text: '怒江傈僳族自治州',
      },
      {
        value: '101291301',
        text: '迪庆藏族自治州',
      },
      {
        value: '101291401',
        text: '丽江市',
      },
      {
        value: '101291501',
        text: '德宏傣族景颇族自治州',
      },
      {
        value: '101291601',
        text: '西双版纳傣族自治州',
      },
    ],
  },
  {
    text: '广西壮族自治区',
    value: 'Guangxi-Zhuang-Autonomous-Region',
    children: [
      {
        value: '101300101',
        text: '南宁市',
      },
      {
        value: '101300201',
        text: '崇左市',
      },
      {
        value: '101300301',
        text: '柳州市',
      },
      {
        value: '101300401',
        text: '来宾市',
      },
      {
        value: '101300501',
        text: '桂林市',
      },
      {
        value: '101300601',
        text: '梧州市',
      },
      {
        value: '101300701',
        text: '贺州市',
      },
      {
        value: '101300801',
        text: '贵港市',
      },
      {
        value: '101300901',
        text: '玉林市',
      },
      {
        value: '101301001',
        text: '百色市',
      },
      {
        value: '101301101',
        text: '钦州市',
      },
      {
        value: '101301201',
        text: '河池市',
      },
      {
        value: '101301301',
        text: '北海市',
      },
      {
        value: '101301401',
        text: '防城港市',
      },
    ],
  },
  {
    text: '海南省',
    value: 'Hainan',
    children: [
      {
        value: '101310101',
        text: '海口市',
      },
      {
        value: '101310201',
        text: '三亚市',
      },
      {
        value: '101310202',
        text: '东方市',
      },
      {
        value: '101310203',
        text: '临高县',
      },
      {
        value: '101310204',
        text: '澄迈县',
      },
      {
        value: '101310205',
        text: '儋州市',
      },
      {
        value: '101310206',
        text: '昌江黎族自治县',
      },
      {
        value: '101310207',
        text: '白沙黎族自治县',
      },
      {
        value: '101310208',
        text: '琼中黎族苗族自治县',
      },
      {
        value: '101310209',
        text: '定安县',
      },
      {
        value: '101310210',
        text: '屯昌县',
      },
      {
        value: '101310211',
        text: '琼海市',
      },
      {
        value: '101310212',
        text: '文昌市',
      },
      {
        value: '101310214',
        text: '保亭黎族苗族自治县',
      },
      {
        value: '101310215',
        text: '万宁市',
      },
      {
        value: '101310216',
        text: '陵水黎族自治县',
      },
      {
        value: '101310221',
        text: '乐东黎族自治县',
      },
      {
        value: '101310222',
        text: '五指山市',
      },
      {
        value: '101310301',
        text: '三沙市',
      },
    ],
  },
  {
    text: '香港特别行政区',
    value: 'Hong-Kong-SAR',
    children: [
      {
        value: '101320101',
        text: '香港特别行政区',
      },
    ],
  },
  {
    text: '澳门特别行政区',
    value: 'Macao-SAR',
    children: [
      {
        value: '101330101',
        text: '澳门特别行政区',
      },
    ],
  },
  {
    text: '中国台湾省',
    value: 'Taiwan',
    children: [
      {
        value: '101231001',
        text: '台湾省',
      },
    ],
  },
]

const citys = []
cityColumns.forEach((item) => {
  if (item.children) {
    citys.push(...item.children)
  }
})

export { citys }

export default cityColumns

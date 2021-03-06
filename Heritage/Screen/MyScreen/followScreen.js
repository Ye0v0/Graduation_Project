import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  ScrollView
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

var https = "http://121.196.191.45";
// var http = "http://192.168.50.91:3000";
var http = "http://121.196.191.45:3000";
var URL = http + "/users/guanzhu/list";
var URL1 = http + "/users/deleteguanzhu1";
var URL2 = http + "/users/deleteguanzhu2";
var URL3 = http + "/users/deleteguanzhu3";
var copyyonghuming;

export default class followScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation, route } = this.props;
    let username = route.params.username;
    this.state = {
      username,
      docs: [],
      docs: this.props.multiList,
      selectMultiItem: [],
    };
  }

  componentDidMount() {//componentDidMount:生命周期
    this.fetchData();
  }

  fetchData() {
    fetch(URL, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username
      })
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          docs: json.docs[0].guanzhu,
        })
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLonding: false });
      })
  }

  _onClickDeleteguanzhu1 = () => {
    fetch(URL1, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        yonghuming: copyyonghuming,
      })
    })
      .then(function (res) {
        return res.json();
      }).then(function (json) {
        if (json.code == 200) {
          // Alert.alert("已取消关注")
          this.fetchData();
        }
      })
  }

  _onClickDeleteguanzhu2 = () => {
    fetch(URL2, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        yonghuming: copyyonghuming,
      })
    })
      .then(function (res) {
        return res.json();
      }).then(function (json) {
        if (json.code == 200) {
          // Alert.alert("取关成功")
        }
      })
  }

  _onClickDeleteguanzhu3 = () => {
    fetch(URL3, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        yonghuming: copyyonghuming,
      })
    })
      .then(function (res) {
        return res.json();
      }).then(function (json) {
        if (json.code == 200) {
          // Alert.alert("已取消关注")
        }
      })
  }

  static defaultProps =
    {
      multiList: [
        {
          "id": "0",
          "name": "音乐",
          select: false
        },
        {
          "id": "1",
          "name": "美术",
          select: false
        },
        {
          "id": "2",
          "name": "舞蹈",
          select: false
        },
      ]
    };
  //多选
  _selectMultiItemPress(item, i) {
    if (item.select) {
      this.state.selectMultiItem.splice(this.state.selectMultiItem.findIndex(function (x) {
        return x === item.yonghuming;
      }), 1);
    } else {
      this.state.selectMultiItem.push(item.yonghuming);
    }
    this.state.docs[i].select = !item.select;
    this.setState({ docs: this.state.docs });
  }
  //递交 选中 
  _submitMultiPress() {
    alert(`选中了${JSON.stringify(this.state.selectMultiItem)}`)
  }
  //渲染多选标记
  _renderMultiMark() {
    const { navigation } = this.props;
    let username = this.state.username;
    let usericon = this.state.usericon;
    let docs = this.state.docs;
    let len = docs.length;
    let menuArr = [];
    for (let i = 0; i < len; i++) {
      let item = docs[i];
      if (item.select) {
        menuArr.push(
          //选中状态
          <View style={styles.one}>
            <View style={styles.massage}>
              <View style={styles.headphoto}>
                <Image style={{ width: '100%', height: '100%', borderRadius: 50 }}
                  source={{ uri: https + item.touxiang }}>
                </Image>
              </View>
              <Text style={styles.key}>{item.yonghuming}</Text>
            </View>
            <TouchableOpacity
            activeOpacity={0.8}
              onPress={() => 
                this._selectMultiItemPress(item,i),
                copyyonghuming = item.yonghuming,
                  this._onClickDeleteguanzhu1()
                // this._onClickDeleteguanzhu2(),
                // this._onClickDeleteguanzhu3(),
                // this.fetchData();
              }
              style={{ alignItems: "center", justifyContent: "center" }}>
              <View style={styles.like}>
                <Text style={{ fontSize: 13 }}>+关注</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      } else {
        menuArr.push(

          // 未选中状态
          <View style={styles.one}>
            <View style={styles.massage}>
              <View style={styles.headphoto}>
                <Image style={{ width: '100%', height: '100%', borderRadius: 50 }}
                  source={{ uri: https + item.touxiang }}>
                </Image>
              </View>
              <Text style={styles.key}>{item.yonghuming}</Text>
            </View>
            <TouchableOpacity
            activeOpacity={0.8}
              onPress={() => 
                this._selectMultiItemPress(item,i)
              }
              style={{ alignItems: "center", justifyContent: "center" }}>
              <View style={styles.like}>
                <Text style={{ fontSize: 13 }}>取消关注</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }
    }
    return (
      //讲各类状态框输出到前端页面
      <View>{menuArr}</View>
    );
  }

  render() {
    const { navigation } = this.props;
    const data = this.state.docs;
    return (
      <View style={styles.container}>
        <View style={{
          backgroundColor: "#fff",
          height: 45,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: 'row',
        }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={{
              width: 50,
              position: "absolute",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              left: 0
            }}>
            <FontAwesome name={'angle-left'} size={25} color={'#000'} />
          </TouchableOpacity>
          <View style={{ width: 200 }}>
            <Text style={{
              fontSize: 18,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>关注</Text>
          </View>
        </View>
        <ScrollView style={styles.contant}>
          <View>
          {this._renderMultiMark()}
            {/* <FlatList
              data={data}
              renderItem={({ item }) => (
                <View style={styles.one}>
                  <View style={styles.massage}>
                    <View style={styles.headphoto}>
                      <Image style={{ width: '100%', height: '100%', borderRadius: 50 }}
                        source={{ uri: https + item.touxiang }}>
                      </Image>
                    </View>
                    <Text style={styles.key}>{item.yonghuming}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      copyyonghuming = item.yonghuming,
                        this._onClickDeleteguanzhu1()
                        // this._onClickDeleteguanzhu2(),
                        // this._onClickDeleteguanzhu3(),
                        // this.fetchData();
                    }}
                    style={{alignItems:"center",justifyContent:"center"}}>
                    <View style={styles.like}>
                      <Text style={{ fontSize: 13 }}>取消关注</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            /> */}
          </View>
        </ScrollView>
      </View>
    )
  };
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f2f2f2',
  },
  contant: {
  },
  return: {
    width: 30,
    height: 30,
  },
  one: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: 'black',
    borderBottomWidth: 0.5,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  key: {
    marginLeft: 10

  },
  headphoto: {
    width: 45,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 50,
    overflow: 'hidden',
    resizeMode: "center"
  },
  massage: {
    flexDirection: "row",
    alignItems: "center"
  },
  like: {
    width: 70,
    height: 25,
    // backgroundColor:'skyblue',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    // flexDirection: 'row'
  }

})
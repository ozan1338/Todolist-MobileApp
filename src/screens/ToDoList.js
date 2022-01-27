import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

import Toast from "react-native-toast-message";

import { AntDesign } from "@expo/vector-icons";

import { API } from "../../config/api";

export default function ToDoList({ route, navigation }) {
  //const todolist = ["Study","Sleep","Eat"]
  const { user } = route.params;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todolist, setTodolist] = useState("");
  const [edit, setEdit] = useState(false);

  const date = () => {
    const today = new Date();

    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };

    return today.toLocaleDateString("en-US", options);
  };

  const getday = date();

  useEffect(async () => {
    onLoad();
    if (list.length !== 0) {
      onLoad();
    }
  }, []);

  const onLoad = async () => {
    setLoading(true);
    try {
      const res = await API.get(`list/${user}`);
      setList(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Error fetch data",
      });
    }
  };

  const addList = async () => {
    setLoading(true);
    try {
      const data = {
        todolist,
      };

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await API.post(`list/${user}`, data, config);
      Toast.show({
        type: "success",
        text1: "Add Item Success",
      });
      onLoad();
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Add Item Failed",
      });
    }
  };

  const editList = async (id) => {
    setLoading(true);
    try {
      const data = {
        todolist,
      };

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await API.patch(`list/${id}`, data, config);
      Toast.show({
        type: "success",
        text1: "update Item Success",
      });
      onLoad();
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "update Item Failed",
      });
    }
  };

  const listDelete = async (id) => {
    setLoading(true);
    try {
      await API.delete(`list/${id}`);
      Toast.show({
        type: "success",
        text1: "delete Item Success",
      });
      onLoad();
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "delete Item Failed",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Todo List</Text>
        <Text style={styles.header}>{getday}</Text>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          defaultValue=""
          onChangeText={(text) => setTodolist(text)}
          placeholder="Input Here"
          clearTextOnFocus
        />
        <TouchableOpacity onPress={addList} style={styles.addButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <View style={styles.todolist}>
            {edit === item.id ? (
              <TextInput
                autoFocus
                onChangeText={(text) => setTodolist(text)}
                defaultValue={item.todolist}
              />
            ) : (
              <Text>{item.todolist}</Text>
            )}
            <View style={styles.actionButton}>
              {edit === item.id ? (
                <TouchableOpacity
                  onPress={() => {
                    editList(item.id);
                    setEdit(null);
                  }}
                  style={styles.saveButton}
                >
                  <AntDesign name="save" size={18} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setEdit(item.id);
                  }}
                  style={styles.editButton}
                >
                  <AntDesign name="edit" size={18} color="white" />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => {
                  listDelete(item.id);
                }}
                style={styles.deleteButton}
              >
                <AntDesign name="delete" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={onLoad}
        extraData={list}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 70,
    alignItems: "center",
  },
  headerContainer: {
    width: "130%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#61B0B7",
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "500",
    color: "#fff",
  },
  textInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  textInput: {
    borderBottomColor: "black",
    height: 40,
    width: "83%",
    borderBottomWidth: 1,
  },
  addButton: {
    height: 35,
    width: 35,
    backgroundColor: "#61B0B7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginLeft: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
  },
  todolist: {
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    height: 40,
    width: 230,
    marginBottom: 10,
    marginTop: 20,
    flexDirection: "row",
  },
  actionButton: {
    flexDirection: "row",
  },
  editButton: {
    height: 30,
    width: 30,
    backgroundColor: "#019875",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    height: 30,
    width: 30,
    backgroundColor: "#F75151",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  saveButton: {
    height: 30,
    width: 30,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: "100%",
  },
  button: {
    height: 30,
    width: 80,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10
  },
});

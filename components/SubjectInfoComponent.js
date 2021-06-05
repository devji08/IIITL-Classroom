import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Table, Row, Rows } from "react-native-table-component";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchSubjectInfo } from "../redux/ActionCreators.js";
import { Loading } from "./loadingComponent.js";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    subjectInfo: state.subjectInfoReducer.subjectInfo,
    isLoading: state.subjectInfoReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchSubjectInfo: (subCode) => dispatch(fetchSubjectInfo(subCode)),
});

class SubjectInfoComponent extends Component {
  componentDidMount() {
    this.props.fetchSubjectInfo(this.props.subCode);
  }

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    } else if (this.props.subjectInfo) {
      const state = this.props.subjectInfo;
      state.subCode = this.props.subCode;
      const startDate = new Date(state.duration.startDate?.toDate());
      const endDate = new Date(state.duration.endDate?.toDate());
      state.duration = `${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`;
      const basicDetails = [
        ["facultyName", "Name of Faculty :"],
        ["department", "Department :"],
        ["subjectName", "Course Module :"],
        ["subCode", "Course Code :"],
        ["duration", "Duration :"],
      ];

      return (
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.card}>
                {basicDetails.map((details, i) => {
                  if (state[details[0]]) {
                    return (
                      <View style={styles.basicInfoRow} key={i}>
                        <View style={styles.basicInfoCol1}>
                          <Text style={styles.basicInfoText1}>
                            {details[1]}
                          </Text>
                        </View>
                        <View style={styles.basicInfoCol2}>
                          <Text style={styles.basicInfoText2}>
                            {state[details[0]]}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </View>
            </View>

            {state.info.map((info, i) => {
              if (info.type == "paragraph") {
                return (
                  <View style={styles.card} key={i}>
                    <Text style={styles.cardHeading}>{info.heading}</Text>
                    {info.content.map((para, j) => (
                      <Text style={styles.cardParagraph} key={j}>
                        {para}
                      </Text>
                    ))}
                  </View>
                );
              } else if (info.type == "bullet") {
                return (
                  <View style={styles.card} key={i}>
                    <Text style={styles.cardHeading}>{info.heading}</Text>
                    {info.content.map((point, j) => (
                      <View style={styles.cardBulletContainer} key={j}>
                        <View style={styles.bulletIcon}>
                          <Ionicons name="ios-radio-button-on" size={10} />
                        </View>
                        <View>
                          <Text style={styles.bulletContent}>{point}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                );
              } else if (info.type == "table") {
                const rowArr = [];
                Object.keys(info.content.rows).map(function (key) {
                  rowArr.push(info.content.rows[key]);
                });

                return (
                  <View style={styles.card} key={i}>
                    <Text style={styles.cardHeading}>{info.heading}</Text>
                    <Table
                      borderStyle={{ borderWidth: 2, borderColor: "#F2F2F2" }}
                    >
                      <Row
                        data={info.content.tableHead}
                        flexArr={info.flexArr}
                        style={styles.tableHead}
                        textStyle={styles.tableHeadText}
                      />
                      <Rows
                        data={rowArr}
                        flexArr={info.flexArr}
                        textStyle={styles.tableText}
                      />
                    </Table>
                  </View>
                );
              }
            })}
          </ScrollView>
        </View>
      );
    } else {
      return <></>;
    }
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 7,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    elevation: 10,
  },
  tableHead: {
    marginTop: 5,
  },
  tableHeadText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#414141",
    fontSize: 16,
    paddingVertical: 5,
  },
  tableText: {
    marginHorizontal: 3,
    marginVertical: 10,
    textAlign: "center",
    fontSize: 15,
  },
  basicInfoRow: {
    flexDirection: "row",
    marginVertical: 2,
  },
  basicInfoCol1: {
    flex: 0.4,
    paddingRight: 2,
  },
  basicInfoText1: {
    fontSize: 16,
    fontWeight: "700",
    color: "#414141",
    textAlign: "right",
  },
  basicInfoCol2: {
    flex: 0.6,
    paddingLeft: 2,
  },
  basicInfoText2: {
    fontSize: 16,
    fontWeight: "700",
    color: "#5DA3FA",
  },
  cardHeading: {
    fontWeight: "700",
    fontSize: 18,
    color: "#414141",
  },
  cardParagraph: {
    marginVertical: 2,
    fontSize: 15,
    color: "#414141",
  },
  cardBulletContainer: {
    flexDirection: "row",
  },
  bulletIcon: {
    padding: 8,
    paddingLeft: 2,
  },
  bulletContent: {
    marginVertical: 2,
    fontSize: 15,
    color: "#414141",
  },
});

export default connect( mapStateToProps, mapDispatchToProps )(SubjectInfoComponent);
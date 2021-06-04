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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     lectureHead: ["Lecture no.", "Topics to be covered"],
  //     lectureData: [
  //       [
  //         "L1_U1",
  //         "Introduction – Computer Networks, Internetworking, Distributed system",
  //       ],
  //       [
  //         "L2_U1",
  //         "Computer Networks – Usage & Applications, Unicasting, multicasting, any-casting, and LAN.",
  //       ],
  //       ["L3_U1", "Software and protocols"],
  //       ["L4_U1", "Layer designing and issues"],
  //       ["L5_U1", "TCP/IP"],
  //       ["L6_U1", "ISO-OSI Model"],
  //       ["L7_U1", "Data Link Layer, Network Layer"],
  //       ["L8_U1", "Transport, Session Layer"],
  //       ["L8a_U1", "Presentation Layer, Applicaion Layer"],
  //     ],
  //   };
  // }

  componentDidMount() {
    this.props.fetchSubjectInfo(this.props.subCode);
  }
  render() {
    console.log("Subject Info: ", this.props.subjectInfo);

    if (this.props.isLoading) {
      return <Loading />;
    } else {
      return <View></View>;
    }

    // const state = this.state;
    return (
      <View style={{ flex: 1 }}>
        {/* <ScrollView>
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={styles.basicInfoRow}>
                <View style={styles.basicInfoCol1}>
                  <Text style={styles.basicInfoText1}>Name of Faculty :</Text>
                </View>
                <View style={styles.basicInfoCol2}>
                  <Text style={styles.basicInfoText2}>
                    Dr. Brijesh Kumar Chaurasia
                  </Text>
                </View>
              </View>
              <View style={styles.basicInfoRow}>
                <View style={styles.basicInfoCol1}>
                  <Text style={styles.basicInfoText1}>Department :</Text>
                </View>
                <View style={styles.basicInfoCol2}>
                  <Text style={styles.basicInfoText2}>
                    Information Technology
                  </Text>
                </View>
              </View>
              <View style={styles.basicInfoRow}>
                <View style={styles.basicInfoCol1}>
                  <Text style={styles.basicInfoText1}>Course Module :</Text>
                </View>
                <View style={styles.basicInfoCol2}>
                  <Text style={styles.basicInfoText2}>Computer Network</Text>
                </View>
              </View>
              <View style={styles.basicInfoRow}>
                <View style={styles.basicInfoCol1}>
                  <Text style={styles.basicInfoText1}>Course Code :</Text>
                </View>
                <View style={styles.basicInfoCol2}>
                  <Text style={styles.basicInfoText2}>CNE431</Text>
                </View>
              </View>
              <View style={styles.basicInfoRow}>
                <View style={styles.basicInfoCol1}>
                  <Text style={styles.basicInfoText1}>Duration :</Text>
                </View>
                <View style={styles.basicInfoCol2}>
                  <Text style={styles.basicInfoText2}>Jan - June 2021</Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardHeading}>Objective(s):</Text>
              <Text style={styles.cardParagraph}>
                To introduce students with an overview of the concepts &
                fundamentals of data communication, computer networks.
              </Text>
            </View>
            
            <View style={styles.card}>
              <Text style={styles.cardHeading}>Prerequisites:</Text>
              <Text style={styles.cardParagraph}>
                Basic understanding of Windows/Linux operating system and
                programming concepts. In particular, goals for course module is
                to understand the state-of-the-art in network protocols,
                architectures and applications and to understand how networking
                research is done.
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardHeading}>Course Contents:</Text>
              <Text style={styles.cardParagraph}>
                Fundamentals of computer networks, usage, applications, and
                types. OSI Reference Models & TCP/IP model.
              </Text>
              <Text style={styles.cardParagraph}>
                Physical Layer, Data Link Layer: Framing, Error Control, Error
                Detection and Correction, Flow Control. Data Link Protocols:
                Simplex Stop-and-Wait Protocol, Sliding Window Protocols,
                One-Bit Sliding Window Protocol, Go-Back-N and Selective Repeat,
                HDLC, PPP Medium Access Control Sublayer, The Channel
                Allocation.
              </Text>
              <Text style={styles.cardParagraph}>
                Multiple Access Protocols: ALOHA, Carrier Sense Multiple Access
                Protocols. IEEE802.x - Ethernet, Switched Ethernet, Fast
                Ethernet, Gigabit Ethernet, 10 Gigabit Ethernet, Wireless LANs -
                IEEE 802 xx, Bluetooth, Bridges, Virtual LANs. Network Layer:
                Design Issues, Store-and-Forward Packet Switching,
                Virtual-Circuit and Datagram Networks.
              </Text>
              <Text style={styles.cardParagraph}>
                IP Addressing (IPV4 & IPV6), Routing: Shortest Path Algorithms,
                Flooding, Distance Vector Routing, Link State Routing,
                Hierarchical Routing, Broadcast Routing, Multicast Routing,
                Anycast Routing.
              </Text>
              <Text style={styles.cardParagraph}>
                Routing for Mobile Hosts, Routing in Ad Hoc Networks, Congestion
                Control – Approaches. Internet Control Protocols, Label
                Switching and MPLS, OSPF, BGP, Internet Multicasting, Mobile IP.
              </Text>
              <Text style={styles.cardParagraph}>
                Transport Layer: Addressing, Connection Establishment,
                Connection Release, Flow Control and Buffering, Multiplexing,
                Congestion Control Algorithms UDP, Application Layer.
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardHeading}>Lecture Plan:</Text>
              <Table borderStyle={{ borderWidth: 2, borderColor: "#F2F2F2" }}>
                <Row
                  data={state.lectureHead}
                  flexArr={[1, 4]}
                  style={styles.tableHead}
                  textStyle={styles.tableHeadText}
                />
                <Rows
                  data={state.lectureData}
                  flexArr={[1, 4]}
                  textStyle={styles.tableText}
                />
                <Row
                  data={state.lectureHead}
                  flexArr={[1, 4]}
                  textStyle={styles.tableText}
                />
              </Table>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardHeading}>Text Books:</Text>
              <View style={styles.cardBulletContainer}>
                <View style={styles.bulletIcon}>
                  <Ionicons name="ios-radio-button-on" size={10} />
                </View>
                <View>
                  <Text style={styles.bulletContent}>
                    To understand Tanenbaum, Andrew. Computer Networks. 3rd ed.
                    Upper Saddle River, NJ: Prentice Hall. ISBN: 0133499456.
                  </Text>
                </View>
              </View>
              <View style={styles.cardBulletContainer}>
                <View style={styles.bulletIcon}>
                  <Ionicons name="ios-radio-button-on" size={10} />
                </View>
                <View>
                  <Text style={styles.bulletContent}>
                    TCP/IP. Protocol Suite. Fourth Edition. Behrouz A. Forouzan
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardHeading}>Contact Details:</Text>
              <Text style={styles.cardParagraph}>
                Dr. Brijesh Kumar Chaurasia
              </Text>
              <Text style={styles.cardParagraph}>
                Department of IT, IIIT Lucknow
              </Text>
              <Text style={styles.cardParagraph}>
                Email: brijesh@iiitl.ac.in, hod.it@iiitl.ac.in
              </Text>
            </View>
            
          </View>
        </ScrollView> */}
      </View>
    );
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

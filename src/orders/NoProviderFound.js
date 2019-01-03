{
  /* <View alignItems="center" justifyContent="center">
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.props.order.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                navigate("Ongoing", {
                  item
                });
              }}
            >
              <View
                key={i}
                justifyContent="flex-end"
                flexDirection="row"
                alignItems="center"
                style={styles.mclCard}
              >
                <View alignItems="center" justifyContent="space-around">
                  <View
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    style={{ marginBottom: 15, marginTop: 10 }}
                  >
                    <View flex={4}>
                      <Text label={item.code} color="#97A2A7" fontSize={15} />
                    </View>
                    <View
                      flex={5}
                      justifyContent="center"
                      alignItems="flex-end"
                      style={{ marginRight: 5 }}
                    >
                      <Text
                        label={item.status}
                        color={item.statusColor}
                        fontSize={15}
                      />
                    </View>
                    <View
                      flex={1}
                      justifyContent="center"
                      alignItems="flex-end"
                    >
                      <Image
                        style={{ width: 24, height: 24 }}
                        source={item.statusIcon}
                      />
                    </View>
                  </View>

                  <View
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    style={{ marginBottom: 10 }}
                  >
                    <Text label={item.date} color="#9B9B9B" fontSize={15} />
                    <View flex={2} />

                    <Text
                      label={item.services[0].title}
                      color="#4F616E"
                      fontSize={15}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View> */
}

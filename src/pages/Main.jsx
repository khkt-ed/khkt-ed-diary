import { useEffect, useState, useRef } from "react";
import { Center, Paper, Stack, Text, ActionIcon, ScrollArea, FileButton } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useLocalStorage } from "@mantine/hooks";
import { IconCameraPlus } from "@tabler/icons-react";
import dayjs from "dayjs";

const today = dayjs().startOf("day").toDate();

const emptyDateData = () => {
  return {
    content: "",
    img: ""
  };
};

const imgToBase64 = img => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => resolve(reader.result?.toString() || "");
    reader.onerror = error => reject(error);
  })
}

const Main = props => {
  const [selectedDateObject, setSelectedDateObject] = useState({
    date: today,
    data: JSON.parse(localStorage.getItem("big-d"))?.[today] || emptyDateData()
  });
  const [bigD, setBigD] = useLocalStorage({
    key: "big-d",
    defaultValue: JSON.parse(localStorage.getItem("big-d")) || {
      [selectedDateObject.date]: selectedDateObject.data
    }
  });

  const textField = useRef(null);

  useEffect(() => {
    textField.current.innerText = selectedDateObject.data.content;
  }, []);

  useEffect(() => {
    setBigD({
      ...bigD,
      [selectedDateObject.date]: selectedDateObject.data
    })
  }, [selectedDateObject])

  return (
    <div className="main">
      <Center
        h="10vh"
        sx={{
          backgroundColor: "hsl(185, 100%, 50%, 0.2)"
        }}
      >
        <DatePickerInput
          size="md"
          value={selectedDateObject.date}
          maxDate={today}
          onChange={value => {
            textField.current.innerText = bigD[value]?.content || "";
            setSelectedDateObject({ date: value, data: bigD[value] || emptyDateData() });
          }}
          styles={{
            input: {
              backgroundColor: "#11ffee00",
              borderColor: "#11ffee00",
              border: 0,
              color: "white",
              fontSize: "1.5rem",
              transition: "0.3s",
              "&:hover": {
                color: "hsl(240, 41%, 42%)",
                backgroundColor: "white"
              }
            }
          }}
        />
      </Center>
      <Center h="90vh">
        <Paper w="50vw" h="85vh" p="1.5rem" radius="lg" shadow="md" opacity="0.88">
          <Stack h="100%" align="center" justify="center" spacing={0}>
            <Text size="3.5rem" fs="italic" sx={{ fontFamily: "'Great Vibes', cursive" }}>
              Daily Diary
            </Text>
            <ScrollArea
              w="100%"
              type="auto"
              sx={{
                flex: 1,
                position: "relative",
                border: "2px solid black",
                borderRadius: "2%",
                backgroundImage: `url(${selectedDateObject.data.img})`,
                backgroundSize: "cover",
              }}>
              <div
                ref={textField}
                contentEditable
                onInput={event => {
                  setSelectedDateObject({
                    ...selectedDateObject,
                    data: {
                      ...selectedDateObject.data,
                      content: event.target.textContent
                    }
                  });
                }}
                style={{
                  width: "calc(50vw - 2 * 1.5rem - 2 * 2px)",
                  padding: "10px",
                  fontSize: "1.2rem",
                  outline: "none",
                  color: "white",
                  mixBlendMode: "exclusion",
                }}
              >
                
              </div>
              <FileButton
                size="2.5rem"
                accept="image/*"
                onChange={async value => {
                  setSelectedDateObject({
                    ...selectedDateObject,
                    data: {
                      ...selectedDateObject.data,
                      img: await imgToBase64(value)
                    }
                  })
                }}
                sx={{
                  position: "absolute",
                  right: 10,
                  bottom: 10,
                  color: "white",
                  mixBlendMode: "exclusion"
                }}
              >
                {buttonProps => 
                  <ActionIcon {...buttonProps}>
                    <IconCameraPlus size="2rem" />
                  </ActionIcon>
                }

              </FileButton>
            </ScrollArea>
          </Stack>
        </Paper>
      </Center>
    </div>
  );
};

export default Main;
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { Box, Typography, Chip } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import MySidebarElement from "./MySidebarElement";

function shadeColor(color, percent) {

  let R = parseInt(color.substring(1,3),16);
  let G = parseInt(color.substring(3,5),16);
  let B = parseInt(color.substring(5,7),16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R<255)?R:255;
  G = (G<255)?G:255;
  B = (B<255)?B:255;

  R = Math.round(R)
  G = Math.round(G)
  B = Math.round(B)

  const RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
  const GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
  const BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}

const styles = (theme) => ({
  sidebarContainer: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
    color: "text.primary",
    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "64px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  sidebarBody: {
    padding: "16px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  sidebarFooter: {
    padding: "16px",
  },
  sidebarFooterButton: {
    width: "100%",
    backgroundColor: "#b3294e",
    color: "white",
    "&:hover": {
      backgroundColor: "#9c2345",
    },
  },
  licenseLink: {
    color: "text.primary",
    fontSize: "0.875rem",
    marginBottom: "8px",
    "&:hover": {
      color: "#b3294e",
      cursor: "pointer",
    },
    display: "flex",
    alignItems: "center",
  },
  chipWrapper: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  chip: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    cursor: "pointer",
  },
  chipSelected: {
    backgroundColor: shadeColor(theme.palette.secondary.main, 100),
    color: "white",
    cursor: "pointer",
  },
  fullWidth: {
    width: "100%",
  },
});

function MySideBar(props) {
  const { classes, soundListPosts, selectSoundList, setSoundListPosts, filterList, setFilterList } = props;
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [isSelected, setIsSelected] = useState(null);

  const uniqueTagList = [
    ...new Set(
      soundListPosts
        .map(({ soundTagList }) => ({ ...soundTagList }))
        .flatMap((obj) => Object.values(obj))
        .map((tag) => tag.tagName)
    ),
  ];

  const typeListChange = (label, element) => {
    return label === element.soundType;
  }

  const lengthChange = (label, element) => {
      const length = element.soundLength;
      if (label.charAt(0) === '0' && length >= 0 && length <= 11)
          return true;
      if (label.charAt(0) === '1' && label.charAt(1) === '1' && length >= 11 && length < 16)
        return true;
      if (label.charAt(0) === '1' && label.charAt(1) === '6' && length >= 16 && length < 21)
        return true;
      if (label.charAt(0) === '2' && label.charAt(1) === '1' && length >= 21 && length < 26)
        return true;
      return label.charAt(0) === 'u' && length >= 26;
  }

  const fileSizeChange = (label, element) => {
    const size = element.soundFileSize;
    if (label.charAt(0) === '0' && size >= 0 && size < 1)
      return true;
    if (label.charAt(0) === '1' && size >= 1 && size < 2)
      return true;
    if (label.charAt(0) === '2' && size >= 2 && size < 3)
      return true;
    if (label.charAt(0) === '3' && size >= 3 && size < 4)
      return true;
    return label.charAt(0) === 'u' && size >= 4;
  }

  const sampleRateChange = (label, element) => {
    const rate = element.soundSampleRate;
    if (label.charAt(0) === '0' && rate >= 0 && rate < 40000)
      return true;
    if (label.charAt(0) === '4' && label.charAt(1) === '0' && rate >= 40001 && rate < 42000)
      return true;
    if (label.charAt(0) === '4' && label.charAt(1) === '2' && rate >= 42001 && rate < 44000)
      return true;
    if (label.charAt(0) === '4' && label.charAt(1) === '4' && rate >= 44001 && rate < 46000)
      return true;
    return label.charAt(0) === 'u' && rate >= 46000;
  }

  const bitDepthChange = (label, element) => {
    const bit = element.soundBitDepth;
    if (label.charAt(0) === '0' && bit >= 0 && bit < 5)
      return true;
    if (label.charAt(0) === '6' && bit >= 6 && bit < 11)
      return true;
    if (label.charAt(0) === '1' && label.charAt(1) === '1' && bit >= 11 && bit < 16)
      return true;
    if (label.charAt(0) === '1' && label.charAt(1) === '6' && bit >= 16 && bit < 21)
      return true;
    return label.charAt(0) === 'u' && bit >= 21;
  }

  const channelsChange = (label, element) => {
    return label === element.soundChannels;
  }

  const resetVisibility = () => {
    const updatedSoundListPosts = soundListPosts.map(sound => {
      return {
        ...sound,
        soundVisible: true
      };
    });
    setSoundListPosts(updatedSoundListPosts);
  }

  useEffect(() => {
    selectSoundList();
    setSelectedTags(new Set());
    resetVisibility();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectSoundList]);

  const handleChipClick = (tagName) => {
    const newSelectedTags = new Set(selectedTags);
    if (selectedTags.has(tagName)) {
      newSelectedTags.delete(tagName);
    } else {
      newSelectedTags.add(tagName);
    }
    setSelectedTags(newSelectedTags);
    const updatedSoundListPosts = soundListPosts.map(sound => {
      let isTagSelected = sound.soundTagList.some((element) => newSelectedTags.has(element.tagName))
      if (newSelectedTags.size === 0){ // 만약 모든 tag가 비어있다면 다시 전체 soundCard가 보이게 만들기
        isTagSelected = true
      }
      return {
        ...sound,
        soundVisible: isTagSelected
      };
    });
    setSoundListPosts(updatedSoundListPosts);

    const newIsSelected = new Array(isSelected.length).fill(false);
    setIsSelected(newIsSelected);
  };
  const durationElementList = [
    {
      value: [0, 10],
      label: "0s ~ 10s"
    },
    {
      value: [11, 15],
      label: "11s ~ 15s"
    },
    {
      value: [16, 20],
      label: "16s ~ 20s"
    },
    {
      value: [21, 25],
      label: "21s ~ 25s"
    },
    {
      value: [26, 100],
      label: "upper to 25s"
    },
  ].map(element => {
    return {
      ...element,
      id: 1,
    }
  });

  const fileSizeElementList = [
    {
      value: [0, 1],
      label: "0MB ~ 1MB",
    },
    {
      value: [1, 2],
      label: "1MB ~ 2MB",
    },
    {
      value: [2, 3],
      label: "2MB ~ 3MB",
    },
    {
      value: [3, 4],
      label: "3MB ~ 4MB",
    },
    {
      value: [4, 100],
      label: "upper to 4MB",
    },
  ].map(element => {
    return {
      ...element,
      id: 2,
    }
  });

  const sampleRateElementList = [
    {
      value: [0, 40000],
      label: "0HZ ~ 40000HZ",
    },
    {
      value: [40001, 42000],
      label: "40001HZ ~ 42000HZ",
    },
    {
      value: [42001, 44000],
      label: "42001HZ ~ 44000HZ",
    },
    {
      value: [44001, 46000],
      label: "44001HZ ~ 46000HZ",
    },
    {
      value: [46001, 1000000],
      label: "upper to 460000HZ",
    },
  ].map(element => {
    return {
      ...element,
      id: 3,
    }
  });

  const bitDepthElementList = [
    {
      value: [0, 5],
      label: "0bit ~ 5bit",
    },
    {
      value: [6, 10],
      label: "6bit ~ 10bit",
    },
    {
      value: [11, 15],
      label: "11bit ~ 15bit",
    },
    {
      value: [16, 20],
      label: "16bit ~ 20bit",
    },
    {
      value: [21, 1000000],
      label: "upper to 21bit",
    },
  ].map(element => {
    return {
      ...element,
      id: 4,
    }
  });


  return ( //type, duration, filesize, sample rate, bit depth, channels
    <Box className={classes.sidebarContainer}>
      {/*id = 0*/}
      <MySidebarElement
        elementName={"Type"}
        elementList={[
          ...new Set(
            soundListPosts
              .map(({ soundType }) => soundType)
          )].map((element) => {
            return {
              value: [element],
              label: element,
              id: 0,
            }
        })
        }
        soundListPosts={soundListPosts}
        setSoundListPosts={setSoundListPosts}
        selectSoundList={selectSoundList}
        changeCallback={typeListChange}
        filterList={filterList}
        setFilterList={setFilterList}
      />
      {/*id = 1*/}
      <MySidebarElement
        elementName={"Duration"}
        elementList={durationElementList}
        soundListPosts={soundListPosts}
        setSoundListPosts={setSoundListPosts}
        selectSoundList={selectSoundList}
        changeCallback={lengthChange}
        filterList={filterList}
        setFilterList={setFilterList}
      />
      <MySidebarElement
        elementName={"File Size"}
        elementList={fileSizeElementList}
        soundListPosts={soundListPosts}
        setSoundListPosts={setSoundListPosts}
        selectSoundList={selectSoundList}
        changeCallback={fileSizeChange}
        filterList={filterList}
        setFilterList={setFilterList}
      />
      <MySidebarElement
        elementName={"Sample Rate"}
        elementList={sampleRateElementList}
        soundListPosts={soundListPosts}
        setSoundListPosts={setSoundListPosts}
        selectSoundList={selectSoundList}
        changeCallback={sampleRateChange}
        filterList={filterList}
        setFilterList={setFilterList}
      />
      <MySidebarElement
        elementName={"Bit Depth"}
        elementList={bitDepthElementList}
        soundListPosts={soundListPosts}
        setSoundListPosts={setSoundListPosts}
        selectSoundList={selectSoundList}
        changeCallback={bitDepthChange}
        filterList={filterList}
        setFilterList={setFilterList}
      />
      <MySidebarElement
        elementName={"Channels"}
        elementList={[
          ...new Set(
            soundListPosts
              .map(({ soundChannels }) => soundChannels)
          )].map((element) => {
          return {
            value: [element],
            label: element,
            id: 5,
          }
        })
        }
        soundListPosts={soundListPosts}
        setSoundListPosts={setSoundListPosts}
        selectSoundList={selectSoundList}
        changeCallback={channelsChange}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        filterList={filterList}
        setFilterList={setFilterList}
      />
      <Box className={classes.sidebarFooter}>
        <Typography
          variant="h6"
          className={`font-semibold uppercase mt-6 mb-2 text-[#4829B2] text-gray-900 ${classes.fullWidth}`}
        >
          Tags
        </Typography>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {uniqueTagList.map((tagName, index) => (
            <div key={index} className={classes.chipWrapper}>
              <ButtonBase onClick={() => handleChipClick(tagName)}>
                <Chip
                  label={tagName}
                  size="small"
                  className={
                    selectedTags.has(tagName)
                      ? classes.chipSelected
                      : classes.chip
                  }
                />
              </ButtonBase>
            </div>
          ))}
        </div>
      </Box>
    </Box>
  );
}

MySideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MySideBar);

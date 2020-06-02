import React, { useMemo } from "react";
import {
  IonCard,
  IonItem,
  IonAvatar,
  IonImg,
  IonText,
  IonCardContent,
  IonRow,
  IonCol,
  IonThumbnail,
  IonIcon,
} from "@ionic/react";
import { checkmark, close } from "ionicons/icons";
import { format } from "date-fns";

import { Launch } from "../generated/graphql";
import styles from "./LaunchDetail.module.scss";

interface Props {
  launch: Launch;
  onSelectImage?: (url: string) => void;
}

const LaunchDetail: React.FC<Props> = (props) => {
  const { launch, onSelectImage = () => null } = props;

  const date = useMemo(
    () => format(new Date(launch.launch_date_utc), "dd-MM-yyyy HH:mm:ss"),
    [launch.launch_date_utc]
  );

  return (
    <IonCard>
      <IonItem lines="none">
        <IonAvatar slot="start">
          <IonImg src={launch.links.mission_patch_small} />
        </IonAvatar>
        <IonText color="dark">
          <h2>{launch.mission_name}</h2>
          <p>{launch.rocket.rocket_name}</p>
          <p>{date}</p>
        </IonText>
        <IonIcon
          slot="end"
          color={launch.launch_success ? "sucess" : "danger"}
          icon={launch.launch_success ? checkmark : close}
        />
      </IonItem>

      <IonImg src={launch.links.flickr_images[0]} className={styles.img} />

      <IonCardContent>{launch.details}</IonCardContent>
      <IonCardContent>
        <IonRow>
          {launch.links.flickr_images.map((image) => (
            <IonCol key={image} size="3">
              <IonThumbnail
                className={styles.thumb}
                onClick={() => onSelectImage(image)}
              >
                <IonImg src={image} />
              </IonThumbnail>
            </IonCol>
          ))}
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};

export default LaunchDetail;

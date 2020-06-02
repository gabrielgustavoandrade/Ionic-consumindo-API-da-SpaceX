import React, { useCallback, useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonModal,
  IonGrid,
  IonRow,
  IonCol,
  IonLoading,
} from "@ionic/react";
import { useParams } from "react-router";
import { useLaunchQuery, Launch } from "../generated/graphql";
import LaunchDetail from "../components/LaunchDetail";
import ImageViewer from "../components/ImageViewer";
import Error from "../components/Error";

const LaunchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useLaunchQuery({
    variables: { id },
  });

  const [selectedImage, setSelectedImage] = useState("");

  const handleSelectImage = useCallback((url: string) => {
    setSelectedImage(url);
  }, []);

  const handleModalClose = useCallback(() => setSelectedImage(""), []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/launches" color="white" />
          </IonButtons>
          <IonTitle>Launch</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <IonLoading isOpen={loading} message="Loading..." />
        ) : error ? (
          <Error error={error} />
        ) : (
          <IonGrid fixed>
            <IonRow>
              <IonCol>
                <LaunchDetail
                  launch={data!.launch as Launch}
                  onSelectImage={handleSelectImage}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
      <IonModal isOpen={!!selectedImage} onDidDismiss={handleModalClose}>
        <ImageViewer src={selectedImage} onClose={handleModalClose} />
      </IonModal>
    </IonPage>
  );
};

export default LaunchPage;

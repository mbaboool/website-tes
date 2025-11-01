import {
  Admin,
  Resource,
} from "react-admin";
import { Event as EventIcon, Photo as PhotoIcon, Book as BookIcon, Settings as SettingsIcon, Dashboard as DashboardIcon, Link as LinkIcon, RateReview as TestimonialIcon } from '@mui/icons-material';
import dataProvider from "./dataProvider";
import { EventList } from "./components/EventList";
import { EventEdit } from "./components/EventEdit";
import { EventShow } from "./components/EventShow";
import { EventCreate } from "./components/EventCreate";
import { GalleryList } from "./components/GalleryList";
import { GalleryEdit } from "./components/GalleryEdit";
import { GalleryShow } from "./components/GalleryShow";
import { GalleryCreate } from "./components/GalleryCreate";
import { BookList } from "./components/BookList";
import { BookEdit } from "./components/BookEdit";
import { BookShow } from "./components/BookShow";
import { SettingList } from "./components/SettingList";
import { SettingEdit } from "./components/SettingEdit";
import { SettingShow } from "./components/SettingShow";
import { SocialLinkList } from "./components/SocialLinkList";
import { SocialLinkEdit } from "./components/SocialLinkEdit";
import { SocialLinkShow } from "./components/SocialLinkShow";
import { TestimonialList } from "./components/TestimonialList";
import { TestimonialEdit } from "./components/TestimonialEdit";
import { TestimonialShow } from "./components/TestimonialShow";
import { TestimonialCreate } from "./components/TestimonialCreate";
import DashboardComponent from "./components/Dashboard";
import CustomLayout from "./Layout"; // Impor layout kustom

const App = () => (
  <Admin 
    dataProvider={dataProvider}
    dashboard={DashboardComponent}
    layout={CustomLayout} // Terapkan layout kustom
  >
    <Resource
      name="events"
      options={{ label: "Acara" }}
      list={EventList}
      create={EventCreate}
      edit={EventEdit}
      show={EventShow}
      icon={EventIcon}
    />
    <Resource
      name="gallery_items"
      options={{ label: "Galeri" }}
      list={GalleryList}
      create={GalleryCreate}
      edit={GalleryEdit}
      show={GalleryShow}
      icon={PhotoIcon}
    />
    <Resource
      name="book_details"
      options={{ label: "Booking" }}
      list={BookList}
      edit={BookEdit}
      show={BookShow}
      icon={BookIcon}
    />
    <Resource
      name="settings"
      options={{ label: "Pengaturan Situs" }}
      list={SettingList}
      edit={SettingEdit}
      show={SettingShow}
      icon={SettingsIcon}
    />
    <Resource
      name="social_links"
      options={{ label: "Tautan Sosial" }}
      list={SocialLinkList}
      edit={SocialLinkEdit}
      show={SocialLinkShow}
      icon={LinkIcon}
    />
    <Resource
      name="testimonials"
      options={{ label: "Testimoni" }}
      list={TestimonialList}
      create={TestimonialCreate}
      edit={TestimonialEdit}
      show={TestimonialShow}
      icon={TestimonialIcon}
    />
  </Admin>
);

export default App;
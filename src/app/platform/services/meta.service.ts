import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {

  constructor(
    private meta: Meta,
  ) {}

  setData(title: string, image: string = '', description: string = '') {
    this.setTitle(title);
    this.setImage(image);
    this.setDescription(description);
    this.setUrl();
    this.setConfigs();
  }

  private setTitle(title: string) {
    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'twitter:title', content: title });
  }

  private setImage(image: string) {
    this.meta.updateTag({ name: 'image', content: image });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:height', content: '500' });
  }

  private setUrl() {
    this.meta.updateTag({ property: 'og:url', content: location.href });
    this.meta.updateTag({ name: 'twitter:url', content: location.href });
  }

  private setDescription(description: string) {
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ name: 'description', content: description });
  }

  private setConfigs() {
    this.setGlobalConfigs();
    this.setTwitterConfigs();
  }

  private setGlobalConfigs() {
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }

  private setTwitterConfigs() {
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  }

}

Project: /docs/reference/js/_project.yaml
Book: /docs/reference/_book.yaml
page_type: reference

{% comment %}
DO NOT EDIT THIS FILE!
This is generated by the JS SDK team, and any local changes will be
overwritten. Changes should be made in the source code at
https://github.com/firebase/firebase-js-sdk
{% endcomment %}

# SettingsOptions interface
Specifies custom options for your Firebase Analytics instance. You must set these before initializing `firebase.analytics()`<!-- -->.

<b>Signature:</b>

```typescript
export interface SettingsOptions 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [dataLayerName](./analytics.settingsoptions.md#settingsoptionsdatalayername) | string | Sets custom name for <code>dataLayer</code> array used by <code>gtag.js</code>. |
|  [gtagName](./analytics.settingsoptions.md#settingsoptionsgtagname) | string | Sets custom name for <code>gtag</code> function. |

## SettingsOptions.dataLayerName

Sets custom name for `dataLayer` array used by `gtag.js`<!-- -->.

<b>Signature:</b>

```typescript
dataLayerName?: string;
```

## SettingsOptions.gtagName

Sets custom name for `gtag` function.

<b>Signature:</b>

```typescript
gtagName?: string;
```

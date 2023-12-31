Project: /docs/reference/js/_project.yaml
Book: /docs/reference/_book.yaml
page_type: reference

{% comment %}
DO NOT EDIT THIS FILE!
This is generated by the JS SDK team, and any local changes will be
overwritten. Changes should be made in the source code at
https://github.com/firebase/firebase-js-sdk
{% endcomment %}

# AnalyticsSettings interface
[Analytics](./analytics.analytics.md#analytics_interface) instance initialization options.

<b>Signature:</b>

```typescript
export interface AnalyticsSettings 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [config](./analytics.analyticssettings.md#analyticssettingsconfig) | [GtagConfigParams](./analytics.gtagconfigparams.md#gtagconfigparams_interface) \| [EventParams](./analytics.eventparams.md#eventparams_interface) | Params to be passed in the initial <code>gtag</code> config call during Firebase Analytics initialization. |

## AnalyticsSettings.config

Params to be passed in the initial `gtag` config call during Firebase Analytics initialization.

<b>Signature:</b>

```typescript
config?: GtagConfigParams | EventParams;
```

<template>
  <ModalLayout
    :showControls="false"
    :customControls="true"
    :title="$t('Caps Protection Preferences')"
  >
    <div slot="fixed">
      <Tabs :tabs="tabs" :value="selectedTab" @input="onSelectTabHandler"> </Tabs>
    </div>
    <div slot="content" class="chatbot-caps-protection__container">
      <transition name="fade" mode="out-in" appear>
        <validated-form ref="form">
          <div v-if="selectedTab === 'general' && capsProtection">
            <div class="row">
              <div class="small-6 columns">
                <VFormGroup
                  :title="$t('Auto Permit')"
                  v-model="capsProtection.general.excluded.level"
                  :metadata="metadata.caps.general.excluded.level"
                />
              </div>
              <div class="small-6 columns">
                <VFormGroup
                  :title="$t('Punishment')"
                  v-model="capsProtection.general.punishment.type"
                  :metadata="metadata.caps.general.punishment.type"
                />
              </div>
            </div>
            <VFormGroup
              v-if="capsProtection.general.punishment.type === 'Timeout'"
              :title="$t('Punishment Duration (Value in Minutes)')"
              v-model="capsProtection.general.punishment.duration"
              :metadata="metadata.caps.general.punishment.duration"
            />
            <VFormGroup
              :title="$t('Punishment Response (Line breaks will be ignored)')"
              v-model="capsProtection.general.message"
              :metadata="metadata.caps.general.message"
            />
          </div>
          <div v-if="selectedTab === 'advanced'">
            <VFormGroup
              :title="$t('Minimum Amount of Caps')"
              v-model="capsProtection.advanced.minimum"
              :metadata="metadata.caps.advanced.minimum"
            />
            <VFormGroup
              :title="$t('Maximum Amount of Caps')"
              v-model="capsProtection.advanced.maximum"
              :metadata="metadata.caps.advanced.maximum"
            />
            <VFormGroup
              :title="$t('Maximum Percent')"
              v-model="capsProtection.advanced.percent"
              :metadata="metadata.caps.advanced.percent"
            />
          </div>
        </validated-form>
      </transition>
    </div>
    <div slot="controls" class="flex flex--space-between">
      <button class="button button--default" @click="onResetHandler">{{ $t('Reset') }}</button>
      <div>
        <button class="button button--default" @click="onCancelHandler">{{ $t('Cancel') }}</button>
        <button class="button button--action" @click="onSaveHandler">{{ $t('Save') }}</button>
      </div>
    </div>
  </ModalLayout>
</template>

<script lang="ts" src="./ChatbotCapsProtectionWindow.vue.ts"></script>

<style lang="less" scoped>
.chatbot-caps-protection__container {
  padding-top: 45px;
}
</style>

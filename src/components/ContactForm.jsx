import React from "react";
import FadeIn from "./FadeIn";
import TextInput from "./TextInput";
import RadioInput from "./RadioInput";
import Button from "./Button";

const ContactForm = () => {
  return (
    <FadeIn>
      <form>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Gửi yêu cầu hợp tác
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label="Name" name="name" autoComplete="name" />
          <TextInput
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
          />
          <TextInput
            label="Company"
            name="company"
            autoComplete="organization"
          />
          <TextInput label="Phone" type="tel" name="phone" autoComplete="tel" />
          <TextInput label="Message" name="message" />
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Loại dự án</legend>
            </fieldset>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <RadioInput label="Quảng cáo" name="type" value="ads" />
              <RadioInput label="MV / Music Video" name="type" value="mv" />
              <RadioInput label="Sự kiện / Livestream" name="type" value="event" />
              <RadioInput label="Social Media" name="type" value="social" />
            </div>
          </div>
        </div>
        <Button type="submit" className="mt-10">
          👉 Bắt đầu hợp tác
        </Button>
      </form>
    </FadeIn>
  );
};

export default ContactForm;

"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiSend,
  FiClock,
  FiExternalLink,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export default function ContactClient() {

  const handleContact = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EJS_SVC,
        process.env.NEXT_PUBLIC_EJS_TMP,
        formData,
        process.env.NEXT_PUBLIC_EJS_KEY
      );

      toast.success("Message sent successfully! We will contact you shortly.");
      e.target.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideRight = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const slideLeft = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (

    <div className="bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-100 via-rose-50 to-white min-h-screen text-stone-700 font-sans pt-28 pb-20 overflow-hidden relative">

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-200/40 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-200/40 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16 md:mb-24"
        >
          <motion.p
            variants={fadeUp}
            className="text-amber-600 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 drop-shadow-sm"
          >
            Get In Touch
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-serif text-stone-900 mb-6 leading-tight"
          >
            We would Love to Hear{" "}
            <span className="italic text-rose-500">From You</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Whether you have a question about our exclusive collections, need
            assistance with your order, or just want to talk about fragrances,
            our team is ready to answer all your questions.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Left : Contact Information (Takes 2 Columns) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Location Card with Premium Glassmorphism */}
            <motion.div
              variants={slideRight}
              className="p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white hover:border-amber-300 shadow-xl shadow-stone-200/50 hover:shadow-amber-200/50 hover:-translate-y-1 transition-all duration-500 group cursor-default"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 border border-amber-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <a
                  href="https://maps.app.goo.gl/53GczS6y1xgwyik29"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiMapPin className="text-xl text-amber-600" />
                </a>
              </div>
              <h3 className="text-stone-900 font-serif text-xl mb-3">
                Visit Our Store
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed font-light">
                Suite 25 (Level 5),
                <br />
                China Town Market,
                <br />
                Naya Paltan, Dhaka,
                <br />
                Bangladesh, 1000
              </p>
            </motion.div>

            {/* Contact Details Card */}
            <motion.div
              variants={slideRight}
              className="p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white hover:border-rose-300 shadow-xl shadow-stone-200/50 hover:shadow-rose-200/50 hover:-translate-y-1 transition-all duration-500 cursor-default"
            >
              <h3 className="text-stone-900 font-serif text-xl mb-6">
                Direct Contact
              </h3>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-100 to-stone-100 border border-amber-200 flex items-center justify-center shrink-0">
                    <FiPhone className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 font-semibold tracking-wider uppercase mb-1">
                      Phone / WhatsApp
                    </p>
                    <a
                      href="tel:+8801575606733"
                      className="text-sm text-stone-700 hover:text-amber-600 font-medium transition-colors"
                    >
                      +880 1575-606733
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-rose-100 to-stone-100 border border-rose-200 flex items-center justify-center shrink-0">
                    <FiMail className="text-rose-600" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 font-semibold tracking-wider uppercase mb-1">
                      Email Address
                    </p>
                    <a
                      href="mailto:rahatkhanrabby06@gmail.com"
                      className="text-sm text-stone-700 hover:text-rose-600 font-medium transition-colors break-all"
                    >
                      rahatkhanrabby06@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-stone-100 to-white border border-stone-200 flex items-center justify-center shrink-0">
                    <FiClock className="text-stone-600" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 font-semibold tracking-wider uppercase mb-1">
                      Business Hours
                    </p>
                    <p className="text-sm text-stone-700 font-medium">
                      10:00 AM - 08:00 PM (Sat - Thu)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Links Card */}
            <motion.div
              variants={slideRight}
              className="p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white hover:border-amber-300 shadow-xl shadow-stone-200/50 hover:shadow-amber-200/50 hover:-translate-y-1 transition-all duration-500"
            >
              <h3 className="text-stone-900 font-serif text-xl mb-6">
                Follow Our Journey
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/ashshamsu01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-[#1877F2] hover:text-white hover:border-transparent transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(24,119,242,0.3)]"
                >
                  <FaFacebookF className="text-sm" />
                </a>

                <a
                  href="https://www.instagram.com/ashshamsu25/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-linear-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(220,39,67,0.3)]"
                >
                  <FaInstagram className="text-sm" />
                </a>

                <a
                  href="https://wa.me/8801575606733"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-[#25D366] hover:text-white hover:border-transparent transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(37,211,102,0.3)]"
                >
                  <FaWhatsapp className="text-base" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right : Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideLeft}
            className="lg:col-span-3"
          >
            <div className="p-8 md:p-12 rounded-3xl bg-white/40 backdrop-blur-md border border-white h-full shadow-xl shadow-stone-200/50 hover:shadow-rose-200/30 transition-all duration-500">
              <h3 className="text-2xl md:text-3xl font-serif text-stone-900 mb-2">
                Send us a Message
              </h3>

              <p className="text-sm text-stone-500 mb-8 font-light">
                Fill out the form below and we will get back to you within 24
                hours.
              </p>

              <form onSubmit={handleContact} className="flex flex-col gap-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold tracking-widest uppercase text-stone-500"
                    >
                      Your Name
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="user_name"
                      required
                      placeholder="Abdullah Mumin"
                      className="w-full bg-white/60 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-500/50 focus:bg-white transition-all placeholder:text-stone-400"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold tracking-widest uppercase text-stone-500"
                    >
                      Your Email
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="user_email"
                      required
                      placeholder="abdullah@email.com"
                      className="w-full bg-white/60 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-500/50 focus:bg-white transition-all placeholder:text-stone-400"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="subject"
                    className="text-xs font-semibold tracking-widest uppercase text-stone-500"
                  >
                    Subject
                  </label>

                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="How can we help you?"
                    className="w-full bg-white/60 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-500/50 focus:bg-white transition-all placeholder:text-stone-400"
                  />
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-semibold tracking-widest uppercase text-stone-500"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="6"
                    placeholder="Write your message here..."
                    className="w-full bg-white/60 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-500/50 focus:bg-white transition-all placeholder:text-stone-400 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="mt-4 flex items-center justify-center gap-3 w-full md:w-auto bg-amber-600 text-white font-semibold tracking-widest uppercase text-xs px-8 py-4 rounded-xl hover:bg-amber-500 shadow-md hover:shadow-amber-500/20 transition-all duration-300 hover:cursor-pointer"
                >
                  <span>Send Message</span>
                  <FiSend className="text-base" />
                </motion.button>

              </form>
            </div>
          </motion.div>
        </div>

        {/* --- Google Minimap Section --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mt-12 lg:mt-16 w-full p-2 md:p-3 rounded-[2rem] bg-white/40 backdrop-blur-md border border-white shadow-xl shadow-stone-200/50"
        >
          <div className="w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden relative group">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.326157893688!2d90.41519919999999!3d23.7357459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9001c8ec301%3A0xed812fdb1727de5!2sA%20S%20Fragrance!5e0!3m2!1sen!2sbd!4v1779429320300!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute top-0 left-0 w-full h-full grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 ease-in-out object-cover"
            ></iframe>

            <a
              href="https://maps.app.goo.gl/SzwuwSKLVtqcJs9M6"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm hover:bg-amber-600 text-stone-800 hover:text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-semibold tracking-wider uppercase transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            >
              <FiExternalLink className="text-lg" />
              Open in Maps
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
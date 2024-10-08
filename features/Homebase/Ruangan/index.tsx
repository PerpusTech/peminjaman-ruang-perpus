"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users } from "lucide-react";

import { IRuanganSchema } from "@/domain/Ruangan";
import { ROUTES_PATH } from "@/constants/routes";
import { BlurImage } from "@/components/common";
import DashboardPagination from "@/components/common/dashboard-pagination";
import { Button } from "@/components/ui/button";

interface IHomebaseRuanganFeatureProps {
  data: any;
  isLoading: boolean;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  limit: number;
  page: number;
}

const HomebaseRuanganFeature: React.FC<IHomebaseRuanganFeatureProps> = (
  props,
) => {
  const { data, isLoading, handleNextPage, handlePrevPage, limit, page } =
    props;

  return (
    <section className="mb-10 md:mb-40">
      <div className="container  flex flex-col items-center gap-2">
        <h1 className="text-center text-xl font-bold md:text-3xl">
          Daftar Ruangan
        </h1>
        <p className="text-center text-sm text-gray-600 md:text-base">
          Daftar ruangan yang tersedia di untuk dipinjam
        </p>
      </div>
      <div className="container mt-5 md:mt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full animate-pulse rounded-lg bg-gray-50 p-2 sm:p-3"
                >
                  <div className="h-48 rounded-lg bg-gray-200/60" />
                  <div className="mt-2 space-y-1">
                    <div className="h-4 w-1/2 rounded-lg bg-gray-200/60" />
                    <div className="flex items-center gap-1">
                      <div className="h-4 w-4 rounded-lg bg-gray-200/60" />
                      <div className="h-4 w-1/2 rounded-lg bg-gray-200/60" />
                    </div>
                    <div className="h-10 w-full rounded-lg bg-gray-200/60" />
                  </div>
                </div>
              ))
            : data?.data?.map((ruangan: IRuanganSchema) => (
                <div
                  key={ruangan.id}
                  className="group rounded-lg border border-gray-50 bg-white p-2 drop-shadow-sm transition-all duration-500 hover:border-gray-200 hover:drop-shadow-lg sm:p-3"
                >
                  <div className="relative h-44 overflow-hidden rounded-lg sm:h-52 md:h-64">
                    <BlurImage
                      alt={ruangan.name}
                      src={ruangan?.images?.[0] || "/images/placeholder.jpg"}
                    />
                    <div className="absolute inset-0 translate-y-72 rounded-lg bg-gradient-to-b from-transparent to-gray-900/10 transition-all duration-300 group-hover:translate-y-0 sm:to-gray-900" />
                    <Button
                      variant="link"
                      className="absolute bottom-0 right-0 text-white opacity-100 transition-all duration-500 group-hover:opacity-100 md:bottom-1/2 md:right-1/2 md:translate-x-1/2 md:translate-y-1/2 md:opacity-0"
                      asChild
                    >
                      <Link href={`${ROUTES_PATH.ruangan}/${ruangan.slug}`}>
                        Lihat Detail
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-2 space-y-1">
                    <h1 className="text-sm font-semibold sm:text-base">
                      {ruangan.name}
                    </h1>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <p className="text-xs sm:text-sm">
                        {ruangan.capacity} Orang
                      </p>
                    </div>
                    <article
                      className="prose prose-p:line-clamp-2  prose-p:text-xs prose-p:sm:text-sm"
                      dangerouslySetInnerHTML={{
                        __html: ruangan.description || "",
                      }}
                    ></article>
                  </div>
                </div>
              ))}
        </div>

        {data?.totalPages > 1 && (
          <div className="my-10">
            <DashboardPagination
              data={data}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              limit={limit}
              page={page}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default HomebaseRuanganFeature;
